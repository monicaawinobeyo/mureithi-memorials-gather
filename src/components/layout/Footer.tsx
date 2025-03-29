
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-memorial-darkblue text-white py-8 mt-12">
      <div className="memorial-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-xl font-serif mb-2">Stephen Mureithi Memorial</h3>
            <p className="text-sm text-gray-300">
              A place to cherish and remember the life of our beloved Stephen.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm">
              © {year} Mureithi Family. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
