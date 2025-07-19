import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://www.okchicas.com/wp-content/uploads/2021/04/maneras-de-usar-y-combinar-diferentes-pinzas-para-el-cabello-2-613x700.png'), 
      new URL('https://tse1.mm.bing.net/th/id/OIP.XDF25quZDwCNacHMXo8eOAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'),
      new URL('https://image.hm.com/assets/hm/de/9d/de9dca7eb2f60a59ea786849334a0b2a000ffb56.jpg?imwidth=1260'),
      new URL('https://image.hm.com/assets/hm/f6/eb/f6eb4666bd5bf617cfcd2ce0f8788c2b6b9529f6.jpg?imwidth=1260'),
      new URL('https://tigocolombia.vteximg.com.br/arquivos/ids/155801-1200-1200/Iphone-frontal.png?v=636610430723600000'),
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      }
      ]
    },
  };
  
  export default nextConfig;
