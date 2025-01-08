import React from 'react';
import { useAuth } from '../context/authContext';

const Homepage = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="text-3xl font-bold pt-14 text-center">
        <p className="text-red-500">Anda belum login. Silakan login terlebih dahulu.</p>
      </div>
    );
  }

  return (
    <div className="pt-14 px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white-800">
          Halo {currentUser.displayName ? currentUser.displayName : currentUser.email}
        </h1>
        <p className="text-lg text-gray-200 mt-2">Selamat datang di halaman utama!</p>
      </div>

      {/* Profile Section */}
      <div className="flex justify-center items-center mb-10">
        <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
          {currentUser.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-white text-2xl">
              {currentUser.displayName ? currentUser.displayName.charAt(0) : 'A'}
            </div>
          )}
        </div>
      </div>

      {/* Welcome Card */}
      <div className="max-w-md mx-auto bg-emerald-400 shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-slate-950">Info Akun</h2>
        <div className="mt-4">
          <p className="text-slate-950">
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p className="text-slate-950 mt-2">
            <strong>Waktu Login Terakhir:</strong> {/* Tampilkan waktu login terakhir */}
            {currentUser.metadata.lastSignInTime
              ? new Date(currentUser.metadata.lastSignInTime).toLocaleString()
              : 'Tidak ada data'}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => alert('Fitur akan datang!')}
          className="btn btn-primary w-full sm:w-auto mb-4"
        >
          Cek Pengumuman
        </button>
        <button
          onClick={() => alert('Fitur akan datang!')}
          className="btn btn-secondary w-full sm:w-auto"
        >
          Pengaturan Akun
        </button>
      </div>
    </div>
  );
};

export default Homepage;
