import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import stiLogo from "./assets/Systems_Technology_Institute.png";
import vita_educationem from "./assets/STI-VITA-EDUCATIONEM.png";
import ImageCropper from "./ImageCropper";


const IDModel = () => {
  const [formData, setFormData] = useState({
    branch: "Cubao",
    firstName: "Juan",
    lastName: "Dela Cruz",
    middleInitial: "A",
  });

  // View Mode state: 'both', 'shs', 'college'
  const [viewMode, setViewMode] = useState("both");

  const [stream, setStream] = useState(null);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  const [open, setOpen] = useState(false);
  const [onCam, setOnCam] = useState(false);
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  );
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [schoolYear, setSchoolYear] = useState({
    startYear: 2026,
    endYear: 2027,
  });

  // Academic Term state: '1st Term', '2nd Term', '3rd Term'
  const [term, setTerm] = useState("1st Term");

  // Attach stream to video elements after render (fixes white-screen bug)
  useEffect(() => {
    if (onCam && stream) {
      if (videoRef1.current) videoRef1.current.srcObject = stream;
      if (videoRef2.current) {
        try {
          videoRef2.current.srcObject = stream.clone();
        } catch {
          videoRef2.current.srcObject = stream;
        }
      }
    }
  }, [onCam, stream, viewMode]);

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 640 }, facingMode: "user" },
      });
      setStream(mediaStream);
      setOnCam(true); // triggers useEffect to attach stream after re-render
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      if (videoRef1.current) videoRef1.current.srcObject = null;
      if (videoRef2.current) videoRef2.current.srcObject = null;
    }
    setOnCam(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const changeSchoolYear = (delta) => {
    setSchoolYear((prev) => ({
      startYear: prev.startYear + delta,
      endYear: prev.endYear + delta,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      setImage(croppedImage);
      // alert("Image cropped successfully!");
    } catch (e) {
      console.error(e);
    }
  };

  const getCroppedImg = (imageSrc, pixelCrop) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const imageObj = new Image();
      imageObj.crossOrigin = "anonymous";

      imageObj.src = imageSrc;
      imageObj.onload = () => {
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        ctx.drawImage(
          imageObj,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-yellow-400 selection:text-slate-900">
      {/* Top Header / App Toolbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-300 hover:text-yellow-400 transition-colors font-bold text-sm"
              title="Back to Home"
            >
              <span className="bg-yellow-400 text-blue-600 px-2 py-1 rounded text-xs font-black">
                STI
              </span>
              <span className="hidden sm:inline">ID Generator</span>
            </Link>
          </div>

          {/* ID Mode Switcher Pill Controls */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shadow-inner">
            <button
              onClick={() => setViewMode("both")}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                viewMode === "both"
                  ? "bg-yellow-400 text-slate-950 shadow-md scale-[1.02]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Both IDs
            </button>
            <button
              onClick={() => setViewMode("shs")}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                viewMode === "shs"
                  ? "bg-blue-600 text-white shadow-md scale-[1.02]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              SHS Only
            </button>
            <button
              onClick={() => setViewMode("college")}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                viewMode === "college"
                  ? "bg-yellow-500 text-slate-950 shadow-md scale-[1.02]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              College Only
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-md hover:shadow-blue-500/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Details
            </button>
          </div>
        </div>
      </header>

      {/* Drawer Overlay Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Slide-over Control Panel (Drawer) */}
      <aside
        className={`fixed top-0 left-0 h-full w-full sm:w-96 bg-slate-900 border-r border-slate-800 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-lg text-white">ID Customization</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close panel"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Form Controls */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Branch / Campus Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              STI Campus / Branch
            </label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              placeholder="e.g. Cubao, Ortigas-Cainta"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 text-sm transition"
              onChange={handleChange}
            />

          </div>

          {/* Student Names */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Student Information
            </label>
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Last Name"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 text-sm transition"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="First Name"
                className="col-span-2 bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 text-sm transition"
                onChange={handleChange}
              />
              <input
                type="text"
                name="middleInitial"
                value={formData.middleInitial}
                maxLength={2}
                placeholder="M.I."
                className="bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 text-sm text-center uppercase transition"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* School Year & Term Controls */}
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                School Year & Term
              </span>
              <span className="text-sm font-bold text-yellow-400">
                SY {schoolYear.startYear}-{schoolYear.endYear}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => changeSchoolYear(-1)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 rounded-lg text-xs font-medium border border-slate-700 transition cursor-pointer"
              >
                 Previous SY
              </button>
              <button
                type="button"
                onClick={() => changeSchoolYear(1)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 rounded-lg text-xs font-medium border border-slate-700 transition cursor-pointer"
              >
                Next SY 
              </button>
            </div>

            {/* Term Selector */}
            <div className="space-y-1.5 pt-1 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Select Academic Term
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {["1st Term", "2nd Term"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTerm(t)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                      term === t
                        ? "bg-emerald-500 text-white shadow-md border border-emerald-400 scale-[1.02]"
                        : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ID Photo Actions */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Student Photo
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label
                htmlFor="img-upload"
                className="bg-slate-800 hover:bg-slate-700 text-white p-2.5 rounded-lg text-xs font-medium border border-slate-700 cursor-pointer text-center flex items-center justify-center gap-1.5 transition"
              >
                <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upload File
              </label>
              <input
                id="img-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              {!onCam ? (
                <button
                  type="button"
                  onClick={openCamera}
                  className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-lg text-xs font-medium cursor-pointer flex items-center justify-center gap-1.5 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Live Camera
                </button>
              ) : (
                <button
                  type="button"
                  onClick={closeCamera}
                  className="bg-red-600 hover:bg-red-500 text-white p-2.5 rounded-lg text-xs font-medium cursor-pointer flex items-center justify-center gap-1.5 transition"
                >
                  Close Camera
                </button>
              )}
            </div>

            {/* Cropper Section */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-medium text-slate-400 block">
                Adjust & Crop Image Ratio
              </span>
              <div className="flex justify-center overflow-hidden rounded-lg">
                <ImageCropper
                  image={image}
                  onCropComplete={(_, croppedPixels) => {
                    setCroppedAreaPixels(croppedPixels);
                  }}
                />
              </div>
              <button
                type="button"
                onClick={handleCrop}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold py-2 rounded-lg text-xs transition cursor-pointer"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80">
          <button
            onClick={() => setOpen(false)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-lg text-sm transition cursor-pointer"
          >
            Done Editing
          </button>
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 pt-6 sm:pt-8 flex flex-col items-center justify-center">
        {/* View Mode Description Banner */}

        {/* Cards Responsive Container Grid */}
        <div
          className={`w-full grid justify-center gap-8 lg:gap-12 items-center transition-all duration-300 ${
            viewMode === "both"
              ? "grid-cols-1 md:grid-cols-2 max-w-4xl"
              : "grid-cols-1 max-w-md"
          }`}
        >
          {/* ==================== SENIOR HIGH SCHOOL ID ==================== */}
          {(viewMode === "both" || viewMode === "shs") && (
            <div className="flex flex-col items-center">
              {viewMode === "both" && (
                <div className="mb-2 px-3 py-1 bg-blue-600/30 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30 uppercase tracking-wide">
                  Senior High School
                </div>
              )}
              
              {/* ID Card Wrapper */}
              <div
                id="SHS_ID"
                className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[1/1.58] bg-yellow-300 text-slate-900 rounded-2xl overflow-hidden id-card-shadow flex flex-col border-4 border-slate-800 transition-transform duration-300 hover:scale-[1.01]"
              >
                {/* Card Blue Top Header */}
                <div className="bg-[#0055a5] p-3 flex justify-center items-center shadow-md relative z-10">
                  <img
                    src={stiLogo}
                    alt="STI Logo"
                    className="bg-yellow-300 py-1 px-3 rounded-md h-[2.75rem] object-contain shadow-sm"
                  />
                </div>

                {/* Card Main Body */}
                <div className="flex-1 relative p-4 flex flex-col items-center justify-between text-center overflow-hidden">
                  {/* Vertical Watermark */}
              

                  {/* Campus & Grade Header */}
                  <div className="z-10 mt-1">
                    <p className="text-[#0055a5] font-extrabold text-sm sm:text-base tracking-wide uppercase">
                      STI {formData.branch || "Campus"}
                    </p>
                    <p className="text-[#0055a5] text-lg sm:text-xl font-black uppercase tracking-tight">
                      Senior High School
                    </p>
                  </div>

                  {/* Student Photo Frame */}
                  <div className="relative z-10 w-40 sm:w-44 aspect-square rounded-xl overflow-hidden border-4 border-white shadow-xl bg-white my-2">
                    {onCam ? (
                      <video
                        ref={videoRef1}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover transform scale-x-[-1]"
                      />
                    ) : (
                      <img
                        src={image}
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Student Details */}
                  <div className="z-10 w-full space-y-1 my-1">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-none">
                      {formData.lastName || "LASTNAME"}
                    </h2>
                    <p className="text-sm sm:text-base font-bold text-slate-800 capitalize leading-tight">
                      {formData.firstName || "Firstname"}{" "}
                      <span className="uppercase">{formData.middleInitial ? `${formData.middleInitial}.` : ""}</span>
                    </p>
                  </div>

                  {/* School Year & Term Badge */}
                  <div className="z-10 bg-emerald-600 text-white px-4 py-1.5 rounded-lg shadow-md border border-emerald-500 text-center">
                    <p className="text-xs sm:text-sm font-black tracking-wide">
                      SY {schoolYear.startYear}-{schoolYear.endYear}
                    </p>
                    <p className="text-[10px] font-bold tracking-wider text-emerald-200 uppercase">
                      {term}
                    </p>
                  </div>

                  <p className="absolute left-2 top-1/2 rotate-90 opacity-30">Fake ID</p>

                  {/* Background Seal Watermark */}
                  <img
                    src={vita_educationem}
                    alt="Watermark"
                    className="absolute -bottom-6 -right-6 w-44 h-44 opacity-25 invert pointer-events-none select-none z-0"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ==================== COLLEGE ID ==================== */}
          {(viewMode === "both" || viewMode === "college") && (
            <div className="flex flex-col items-center">
              {viewMode === "both" && (
                <div className="mb-2 px-3 py-1 bg-yellow-500/30 text-yellow-400 rounded-full text-xs font-bold border border-yellow-500/30 uppercase tracking-wide">
                  College ID
                </div>
              )}

              {/* ID Card Wrapper */}
              <div
                id="COLLEGE_ID"
                className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[1/1.58] bg-[#0055a5] text-white rounded-2xl overflow-hidden id-card-shadow flex flex-col border-4 border-slate-800 transition-transform duration-300 hover:scale-[1.01]"
              >
                {/* Card Yellow Top Header */}
                <div className="bg-yellow-300 p-3 flex justify-center items-center shadow-md relative z-10">
                  <img
                    src={stiLogo}
                    alt="STI Logo"
                    className="py-1 px-3 rounded-md h-[2.75rem] object-contain shadow-sm"
                  />
                </div>

                {/* Card Main Body */}
                <div className="flex-1 relative p-4 flex flex-col items-center justify-between text-center overflow-hidden">
                 

                  {/* Campus Header */}
                  <div className="z-10 mt-1">
                    <p className="text-yellow-300 font-extrabold text-sm sm:text-base tracking-wide uppercase">
                      STI {formData.branch || "Campus"}
                    </p>
                    <p className=" text-transparent text-lg sm:text-xl font-black uppercase tracking-tight">
                      College
                    </p>
                  </div>

                  {/* Student Photo Frame */}
                  <div className="relative z-10 w-40 sm:w-44 aspect-square rounded-xl overflow-hidden border-4 border-white shadow-xl bg-white my-2">
                    {onCam ? (
                      <video
                        ref={videoRef2}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover transform scale-x-[-1]"
                      />
                    ) : (
                      <img
                        src={image}
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Student Details */}
                  <div className="z-10 w-full space-y-1 my-1">
                    <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none">
                      {formData.lastName || "LASTNAME"}
                    </h2>
                    <p className="text-sm sm:text-base font-bold text-white capitalize leading-tight">
                      {formData.firstName || "Firstname"}{" "}
                      <span className="uppercase">{formData.middleInitial ? `${formData.middleInitial}.` : ""}</span>
                    </p>
                  </div>

                  {/* School Year & Term Badge */}
                  <div className="z-10 bg-emerald-600 text-white px-4 py-1.5 rounded-lg shadow-md border border-emerald-500 text-center">
                    <p className="text-xs sm:text-sm font-black tracking-wide">
                      SY {schoolYear.startYear}-{schoolYear.endYear}
                    </p>
                    <p className="text-[10px] font-bold tracking-wider text-emerald-200 uppercase">
                      {term}
                    </p>
                  </div>

                  <p className="absolute left-2 top-1/2 rotate-90 opacity-30">Fake ID</p>
                  {/* Background Seal Watermark */}
                  <img
                    src={vita_educationem}
                    alt="Watermark"
                    className="absolute -bottom-6 -right-6 w-44 h-44 opacity-20 invert pointer-events-none select-none z-0"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="border-t border-slate-800/80 py-4 px-4 text-center text-xs text-slate-500">
        By STIers for STIers
      </footer>
    </div>
  );
};

export default IDModel;
