import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: 'Lamine Yamal',
      role: 'Founder & CEO',
      bio: 'Lamine has been an avid camper for over 20 years and founded Camping Corner to share his passion.',
      image: '/person/3.png'
    },
    {
      name: 'Mike Trailblazer',
      role: 'Product Specialist',
      bio: 'Mike tests all our products personally in various terrains to ensure top quality.',
      image: '/person/2.png'
    },
    {
      name: 'Emily Naturalist',
      role: 'Customer Experience Manager',
      bio: 'Emily ensures every customer finds the perfect gear for their outdoor adventures.',
      image: '/person/1.png'
    },
  ];

  return (
    <div className="flex flex-col justify-start items-center">
      {/* Title div */}
      <div className="w-full min-h-[200px] md:min-h-[300px] flex flex-col justify-center items-start bg-slate-300 px-4 sm:px-6 md:px-10 py-5"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/public/bg/bg4.webp')",
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}>
        <h1 className="font-primary text-left text-3xl md:text-5xl font-semibold text-primary">About</h1>

        {/* Breadcrumb div */}
        <nav className="flex text-sm text-bodyText mt-4 font-medium">
          <NavLink to="/" className="hover:text-primary duration-200">Home</NavLink>
          <span className="mx-2">/</span>
          <span className="text-gray-500">About us</span>
        </nav>
      </div>

      <div className='container mx-auto p-4 sm:p-5'>
        {/* mission + contact */}
        <div className='mt-8 md:mt-12 mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-stretch gap-6 md:gap-10'>
          {/* Mission Statement */}
          <div className="w-full md:w-1/2 shadow-md p-4 md:p-5 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold font-primary mb-3 md:mb-4 text-primary">Our Mission</h2>
            <p className="text-base md:text-lg text-bodyText">
              At Camping Corner, we're passionate about enhancing your outdoor experiences. Our mission is to provide high-quality, reliable camping gear that allows you to connect with nature safely and comfortably. We believe that everyone should have access to the great outdoors, and we're here to make that possible with our curated selection of camping essentials.
            </p>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/2 shadow-md p-4 md:p-5 rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold font-primary mb-3 md:mb-4 text-primary">Contact Us</h2>
            <div className="bg-white">
              <p className="text-base md:text-lg font-medium mb-2"><strong>Phone:</strong> (555) 123-4567</p>
              <p className="text-base md:text-lg font-medium mb-2"><strong>Email:</strong> info@campingcorner.com</p>
              <p className="text-base md:text-lg font-medium mb-2"><strong>Address:</strong> 789 Forest Lane, Outdoor City, Nature State 54321</p>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-12 md:mb-20">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 font-primary text-primary">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member bg-white shadow-md rounded-lg p-4 md:p-6 flex flex-col items-center">
                <img src={member.image} alt={member.name} className="w-32 h-32 md:w-48 md:h-48 rounded-full mb-3 md:mb-4 object-cover" />
                <h3 className="text-lg md:text-xl font-semibold font-primary text-black mb-2">{member.name}</h3>
                <p className="text-bodyText font-medium mb-1">{member.role}</p>
                <p className="text-bodyText text-center text-sm md:text-base">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Google Map */}
        <div className="mb-12 md:mb-20">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary font-primary">Visit Our Store</h2>
          <div className="aspect-w-16 aspect-h-9 flex justify-center items-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58989.946486976245!2d92.05943393442381!3d22.47145682292431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad36f1a4390c83%3A0x7fab066889e9d8fd!2zR3VtYWkgQmVlbCwg4KaX4KeB4Kau4Ka-4KaHIOCmrOCmv-Cmsg!5e0!3m2!1sen!2sbd!4v1726165997040!5m2!1sen!2sbd"
              width="100%"
              className='rounded-xl shadow-lg'
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="Camping Corner Store Location"
            ></iframe>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mb-8 md:mb-12 social-div">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary font-primary">Find Us On</h2>
          <div className="flex space-x-4 md:space-x-8 justify-start">
            <a href="/about" target="_blank" rel="noopener noreferrer" className="text-4xl md:text-6xl text-blue-600 shadow-sm hover:text-blue-800">
              <FaFacebook />
            </a>
            <a href="/about" target="_blank" rel="noopener noreferrer" className="text-4xl md:text-6xl shadow-sm text-blue-400 hover:text-blue-600">
              <FaTwitter />
            </a>
            <a href="/about" target="_blank" rel="noopener noreferrer" className="text-4xl md:text-6xl text-pink-600 shadow-sm hover:text-pink-800">
              <FaInstagram />
            </a>
            <a href="/about" target="_blank" rel="noopener noreferrer" className="text-4xl md:text-6xl text-red-600 shadow-sm hover:text-red-800">
              <FaPinterest />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;