import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AudioRecorder = ({ onRecordingComplete, existingRecording }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(existingRecording || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [waveformData, setWaveformData] = useState(Array(50)?.fill(0));

  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    return () => {
      if (streamRef?.current) {
        streamRef?.current?.getTracks()?.forEach(track => track?.stop());
      }
      if (intervalRef?.current) {
        clearInterval(intervalRef?.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        updateWaveform();
      }, 1000);
    } else {
      if (intervalRef?.current) {
        clearInterval(intervalRef?.current);
      }
    }

    return () => {
      if (intervalRef?.current) {
        clearInterval(intervalRef?.current);
      }
    };
  }, [isRecording, isPaused]);

  const updateWaveform = () => {
    if (analyserRef?.current && dataArrayRef?.current) {
      analyserRef?.current?.getByteFrequencyData(dataArrayRef?.current);
      const newWaveformData = Array.from(dataArrayRef?.current)?.slice(0, 50)?.map(value => value / 255);
      setWaveformData(newWaveformData);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Set up audio analysis
      const audioContext = new AudioContext();
      const source = audioContext?.createMediaStreamSource(stream);
      const analyser = audioContext?.createAnalyser();
      analyser.fftSize = 256;
      source?.connect(analyser);
      
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks?.push(event?.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        onRecordingComplete(blob);
        
        // Create audio element to get duration
        const audio = new Audio(URL.createObjectURL(blob));
        audio.onloadedmetadata = () => {
          setAudioDuration(audio?.duration);
        };
      };

      mediaRecorder?.start();
      setIsRecording(true);
      setRecordingTime(0);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef?.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef?.current?.resume();
        setIsPaused(false);
      } else {
        mediaRecorderRef?.current?.pause();
        setIsPaused(true);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef?.current && isRecording) {
      mediaRecorderRef?.current?.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      if (streamRef?.current) {
        streamRef?.current?.getTracks()?.forEach(track => track?.stop());
      }
    }
  };

  const playRecording = () => {
    if (audioBlob && audioRef?.current) {
      if (isPlaying) {
        audioRef?.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef?.current?.play();
        setIsPlaying(true);
      }
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setAudioDuration(0);
    setPlaybackTime(0);
    setIsPlaying(false);
    onRecordingComplete(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="bg-card rounded-lg border border-border p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Mic" size={20} className="mr-2 text-primary" />
          Audio Reflection
        </h3>
        <div className="text-sm text-muted-foreground">
          {isRecording ? (
            <span className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
              Recording: {formatTime(recordingTime)}
            </span>
          ) : audioBlob ? (
            <span>Duration: {formatTime(Math.floor(audioDuration))}</span>
          ) : (
            <span>No recording yet</span>
          )}
        </div>
      </div>
      {/* Waveform Visualization */}
      <div className="mb-6">
        <div className="h-20 bg-muted/30 rounded-lg flex items-end justify-center space-x-1 p-2">
          {waveformData?.map((amplitude, index) => (
            <motion.div
              key={index}
              className={`w-1 rounded-full ${
                isRecording ? 'bg-red-500' : 'bg-primary'
              }`}
              style={{
                height: `${Math.max(4, amplitude * 60)}px`,
              }}
              animate={{
                height: `${Math.max(4, amplitude * 60)}px`,
              }}
              transition={{ duration: 0.1 }}
            />
          ))}
        </div>
      </div>
      {/* Recording Controls */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <AnimatePresence mode="wait">
          {!isRecording && !audioBlob && (
            <motion.button
              key="start"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={startRecording}
              className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Icon name="Mic" size={24} />
            </motion.button>
          )}

          {isRecording && (
            <motion.div
              key="recording"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center space-x-3"
            >
              <button
                onClick={pauseRecording}
                className="w-12 h-12 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Icon name={isPaused ? "Play" : "Pause"} size={20} />
              </button>
              
              <button
                onClick={stopRecording}
                className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
              >
                <Icon name="Square" size={24} />
              </button>
            </motion.div>
          )}

          {audioBlob && !isRecording && (
            <motion.div
              key="playback"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center space-x-3"
            >
              <button
                onClick={playRecording}
                className="w-12 h-12 bg-primary hover:bg-primary/80 text-primary-foreground rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
              </button>
              
              <button
                onClick={deleteRecording}
                className="w-12 h-12 bg-destructive hover:bg-destructive/80 text-destructive-foreground rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Icon name="Trash2" size={20} />
              </button>
              
              <button
                onClick={startRecording}
                className="w-12 h-12 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Icon name="RotateCcw" size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Audio Element */}
      {audioBlob && (
        <audio
          ref={audioRef}
          src={URL.createObjectURL(audioBlob)}
          onTimeUpdate={(e) => setPlaybackTime(e?.target?.currentTime)}
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={(e) => setAudioDuration(e?.target?.duration)}
        />
      )}
      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground">
        {!audioBlob && !isRecording && (
          <p>Click the microphone to start recording your audio reflection</p>
        )}
        {isRecording && (
          <p className="text-red-500">
            {isPaused ? 'Recording paused - Click play to resume' : 'Recording in progress - Share your leadership insights'}
          </p>
        )}
        {audioBlob && !isRecording && (
          <p>Audio recorded successfully - You can play, delete, or re-record</p>
        )}
      </div>
      {/* Recording Requirements */}
      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-start space-x-2 text-sm">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-muted-foreground">
            <p className="font-medium mb-1">Audio Reflection Guidelines:</p>
            <ul className="space-y-1 text-xs">
              <li>• Minimum 30 seconds recommended</li>
              <li>• Share key leadership moments and decisions</li>
              <li>• Reflect on team interactions and outcomes</li>
              <li>• Consider areas for improvement</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AudioRecorder;