
import React, { useState, useRef, useCallback } from 'react';
import { Video } from '../data/videos';

interface UploadPageProps {
  onUploadComplete: (video: Video) => void;
  onCancel: () => void;
}

const UploadPage: React.FC<UploadPageProps> = ({ onUploadComplete, onCancel }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [selectedThumb, setSelectedThumb] = useState<number>(1);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setTitle(file.name);
      // Generate a preview, and also the first thumbnail
      const videoURL = URL.createObjectURL(file);
      generateThumbnail(videoURL, 1);
    } else {
      alert('Please select a valid video file.');
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
       setVideoFile(file);
       setTitle(file.name);
       const videoURL = URL.createObjectURL(file);
       generateThumbnail(videoURL, 1);
    }
  }, []);

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, isOver: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if(videoFile) return; // Don't show drag over if a file is already selected
    setIsDragOver(isOver);
  };
  
  const generateThumbnail = (videoSrc: string, time: number) => {
    const videoElement = document.createElement('video');
    videoElement.src = videoSrc;
    videoElement.currentTime = time;
    videoElement.onloadeddata = () => {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setThumbnailPreview(dataUrl);
        setSelectedThumb(1); // Auto-select the first generated thumb
      }
    };
  };

  // FIX: Create a separate handler for thumbnail file changes.
  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
        setSelectedThumb(0); // Use 0 to indicate custom thumbnail
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handlePublish = () => {
    if (!videoFile || !title) {
      alert('Please upload a video and provide a title.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0); // Start progress from 0
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          const newVideo: Video = {
            id: new Date().toISOString(),
            category: 'Tutorials', // Default category
            thumbnail: thumbnailPreview || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963e?w=800&h=450&fit=crop',
            title: title,
            channelName: 'Arjun Mehta',
            channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80',
            views: '0 views',
            uploadDate: 'Just now',
            duration: '12:45',
          };
          onUploadComplete(newVideo);
          return 100;
        }
        return next;
      });
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-10 animate-in fade-in duration-300">
      <div className="relative w-full max-w-[960px] h-full max-h-[850px] bg-[#281e1e] rounded-xl shadow-2xl flex flex-col border border-[#392828] z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#392828] bg-[#281e1e]">
          <h1 className="text-xl font-bold text-white">{videoFile ? title : 'Upload videos'}</h1>
          <div className="flex items-center gap-4">
            <button onClick={onCancel} className="text-gray-400 hover:text-white transition">
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
        </div>

        {!videoFile ? (
            <div 
              onDrop={handleDrop}
              onDragOver={(e) => handleDragEvents(e, true)}
              onDragLeave={(e) => handleDragEvents(e, false)}
              className="flex-1 flex flex-col items-center justify-center gap-6 p-10"
            >
              <input type="file" ref={videoInputRef} accept="video/*" onChange={handleFileChange} className="hidden" />
              <div className={`size-32 rounded-full bg-[#1f1616] border-2 border-dashed flex items-center justify-center transition-colors ${isDragOver ? 'border-primary' : 'border-[#392828]'}`}>
                <span className="material-symbols-outlined text-6xl text-white/30">upload_file</span>
              </div>
              <div className="text-center">
                 <p className="text-white text-lg">Drag and drop video files to upload</p>
                 <p className="text-white/50 text-sm mt-1">Your videos will be private until you publish them.</p>
              </div>
              <button onClick={() => videoInputRef.current?.click()} className="px-6 py-2.5 bg-primary text-background-dark font-bold rounded-lg text-sm hover:brightness-110 transition-all">
                Select Files
              </button>
            </div>
        ) : (
            <>
                {/* Stepper & Progress */}
                <div className="px-6 pt-6 pb-2 bg-[#281e1e]">
                    <div className="flex items-center justify-center border-b border-[#392828] gap-12 sm:gap-16 relative">
                        {['Details', 'Video elements', 'Checks', 'Visibility'].map((step, index) => (
                           <div key={step} className={`flex flex-col items-center gap-2 pb-3 border-b-2 cursor-pointer relative top-[1px] ${index === 0 ? 'border-primary' : 'border-transparent'}`}>
                                <p className={`text-sm font-bold tracking-wide uppercase ${index === 0 ? 'text-primary' : 'text-gray-400'}`}>{step}</p>
                                <div className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-primary text-white shadow-[0_0_10px_rgba(236,19,19,0.5)]' : 'bg-[#392828] text-gray-400'}`}>
                                    {index + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                    {isUploading && (
                         <div className="mt-4">
                            <div className="flex items-center justify-between text-xs font-medium text-gray-400">
                                <span className="text-primary animate-pulse">Processing... {100 - uploadProgress}% left</span>
                                <span>{uploadProgress}% Uploaded</span>
                            </div>
                            <div className="w-full bg-[#392828] rounded-full h-1.5 mt-2 overflow-hidden">
                                <div className="bg-primary h-1.5 rounded-full" style={{ width: `${uploadProgress}%`, transition: 'width 0.2s linear' }}></div>
                            </div>
                         </div>
                    )}
                </div>

                {/* Main Body */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            <h3 className="text-2xl font-bold text-white">Details</h3>
                            <input value={title} onChange={e => setTitle(e.target.value)} className="form-input-dark !h-12 !text-base" placeholder="Title (required)" />
                            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={6} className="form-input-dark" placeholder="Description"></textarea>
                            
                            <div>
                                <label className="text-base font-medium text-white">Thumbnail</label>
                                <p className="text-xs text-gray-400 mb-2">Select or upload a picture that shows what's in your video.</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <button onClick={() => thumbnailInputRef.current?.click()} className="aspect-video border border-dashed border-gray-500 hover:border-white rounded-sm flex flex-col items-center justify-center text-gray-400 hover:text-white transition hover:bg-[#392828]">
                                        {/* FIX: Use the correct handler for thumbnail changes. */}
                                        <input type="file" ref={thumbnailInputRef} accept="image/*" onChange={handleThumbnailFileChange} className="hidden"/>
                                        <span className="material-symbols-outlined text-2xl mb-1">add_photo_alternate</span>
                                        <span className="text-xs font-bold uppercase">Upload</span>
                                    </button>
                                    {[1, 2, 3].map(i => (
                                        <div key={i} onClick={() => setSelectedThumb(i)} className={`aspect-video relative rounded-sm overflow-hidden border-2 group cursor-pointer bg-[#181111] ${selectedThumb === i ? 'border-primary' : 'border-transparent hover:border-white'}`}>
                                            {thumbnailPreview ? <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"/> : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-gray-600">image</span></div>}
                                            {selectedThumb === i && <div className="absolute inset-0 bg-primary/20"></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-0 flex flex-col gap-4">
                                <div className="bg-[#1f1616] rounded-lg overflow-hidden border border-[#392828] shadow-lg">
                                    <div className="aspect-video bg-black relative group">
                                        <video src={URL.createObjectURL(videoFile)} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-4 space-y-4">
                                        <div>
                                            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Video Link</span>
                                            <a className="text-primary text-sm truncate block" href="#">youtu.be/x8sd9s8d</a>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Filename</span>
                                            <p className="text-white text-sm truncate">{videoFile.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[#392828] bg-[#1f1616] flex items-center justify-end shrink-0">
                    <button onClick={handlePublish} disabled={isUploading} className="bg-primary hover:bg-[#c90f0f] text-white px-6 py-2 rounded uppercase font-semibold text-sm shadow-lg shadow-primary/20 transition-all disabled:opacity-50">
                        {isUploading ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
