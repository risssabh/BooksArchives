import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import AddBook from './pages/AddBook';
import BookDetails from './pages/BookDetails';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="container" style={{ paddingTop: '16px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Browse />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="*" element={<div>404 • Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
