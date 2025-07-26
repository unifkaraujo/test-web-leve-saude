export default function Footer() {
  return (
    <footer className="bg-gray-200 text-center text-sm py-4 mt-6 text-gray-600">
      <div className="max-w-2xl mx-auto text-center px-4">
        <p>&copy; {new Date().getFullYear()} FeedbackHub. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
