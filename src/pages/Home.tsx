import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useGetAllProductsQuery } from '@/redux/features/product/productApi';
import { TProduct } from '@/types/ProductType';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }: { product: TProduct }) => (
  <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg">
    <CardHeader className="p-0">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-2 left-2 bg-primary text-white">
          {product.category}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="flex-grow p-4">
      <h3 className="text-lg font-semibold line-clamp-2 mb-2">{product.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-3 mb-2">{product.description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </span>
        <div className="flex items-center">
          <FaStar className="text-yellow-500 mr-1" />
          <span className="text-sm font-medium">{product?.rating.toFixed(1)}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-0">
      <Button asChild className="w-full">
        <Link to={`/product/${product._id}`}>View Details</Link>
      </Button>
    </CardFooter>
  </Card>
);

const Home = () => {
  const { data: productsData, isLoading, isError } = useGetAllProductsQuery({});

  const bestSellingProducts = productsData?.data?.products
    .filter((product: TProduct) => product?.rating >= 4.5)
    .slice(0, 4);

  const categories = [
    { name: 'Shelter', icon: '⛺' },
    { name: 'Sleeping Gear', icon: '🛏️' },
    { name: 'Cooking', icon: '🍳' },
    { name: 'Clothing', icon: '👕' },
    { name: 'Accessories', icon: '🎒' },
    { name: 'Tools', icon: '🔧' },
  ];

  const faqs = [
    { question: 'What is your return policy?', answer: 'We offer a 30-day return policy for all unused items in their original packaging.' },
    { question: 'How long does shipping take?', answer: 'Shipping typically takes 3-5 business days within the continental US.' },
    { question: 'Do you ship internationally?', answer: 'Yes, we ship to most countries. International shipping times may vary.' },
    { question: 'Are your products eco-friendly?', answer: 'Many of our products are made with sustainable materials. Look for our eco-friendly badge on product pages.' },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-cover bg-center flex items-center justify-center" style={{backgroundImage: 'url("/hero-image.jpg")'}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Adventure Awaits</h1>
          <p className="text-xl mb-8">Discover the Best Camping Gear for Your Next Trip</p>
          <Button asChild size="lg">
            <Link to="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Best Selling Products Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Best Selling Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellingProducts?.map((product: TProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link key={index} to={`/products?category=${category.name}`} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <span className="text-4xl mb-2">{category.icon}</span>
                <span className="text-center font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData?.data?.products.slice(0, 3).map((product: TProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Unique Section - Video Blog */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Camping Tips & Tricks</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              className="w-full h-[40vh] md:h-[60vh]"
              src="https://www.youtube.com/embed/VIDEO_ID" 
              title="Camping Tips & Tricks" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Home;