import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import komponen lain yang terkait dengan Layout
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";

// Functional Component untuk Layout
const LayoutHorizontal = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State untuk mengelola apakah menu terbuka atau tidak
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  // Menggunakan useEffect untuk mensimulasikan componentDidMount
  useEffect(() => {
    // Mengatur layout body menjadi horizontal
    if (document.body) document.body.setAttribute('data-layout', 'horizontal');

    // Logika untuk preloader
    if (props.isPreloader === true) {
      // Menampilkan elemen preloader
      document.getElementById("preloader").style.display = "block";
      document.getElementById("status").style.display = "block";

      // Menyembunyikan preloader setelah 2.5 detik
      setTimeout(() => {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("status").style.display = "none";
      }, 2500);
    } else {
      // Jika preloader tidak diaktifkan, langsung sembunyikan elemen preloader
      document.getElementById("preloader").style.display = "none";
      document.getElementById("status").style.display = "none";
    }

    // Menggulir halaman ke atas saat komponen dimuat atau saat path berubah
    window.scrollTo(0, 0);
  }, [props.isPreloader]); // Menggunakan isPreloader sebagai dependensi

  return (
    <React.Fragment>
      {/* Menampilkan Header */}
      <Header />
      {/* Menampilkan Navbar */}
      <Navbar isMenuOpened={isMenuOpened} toggleMenu={() => setIsMenuOpened(!isMenuOpened)} />
      {/* Menampilkan anak komponen yang dikirim melalui props */}
      {props.children}
      {/* Menampilkan Footer */}
      <Footer />
    </React.Fragment>
  );
};

// Export without withRouter
export { LayoutHorizontal };
