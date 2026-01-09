import logo from './logo.svg';
import logo_dark from './logo_dark.svg';
import cross_icon from './cross_icon.svg';
import menu_icon from './menu_icon.svg';
import star_icon from './star_icon.svg';
import left_arrow from './left_arrow.svg';
import right_arrow from './right_arrow.svg';
import header_img from './header_img.png';
import brand_img from './brand_img.png';
import project_img_1 from './project_img_1.jpg';
import project_img_2 from './project_img_2.jpg';
import project_img_3 from './project_img_3.jpg';
import project_img_4 from './project_img_4.jpg';
import project_img_5 from './project_img_5.jpg';
import archie from './archie.jpg';
import BgVideo1 from './BgVideo1.mp4';
import BgVideo2 from './BgVideo2.mp4';
import BgVideo3 from './BgVideo3.mp4';
import construction from './construction.jpg';
import lands from './lands.jpg';
import urban1 from './urban1.jpg';
import architecture1 from './architecture1.jpg';
import architecture2 from './architecture2.jpg';
import architecture3 from './architecture3.jpg';
import architecture4 from './architecture4.jpg';
import architecture5 from './architecture5.jpg';
import architecture6 from './architecture6.jpg';
import architecture_hero from './architecture_hero.jpg';
import landscape from './landscape.jpg';
import landscaping1 from './landscaping1.jpg';
import landscaping2 from './landscaping2.jpg';
import landscaping3 from './landscaping3.jpg';
import landscaping4 from './landscaping4.jpg';
import landscaping5 from './landscaping5.jpg';
import landscaping6 from './landscaping6.jpg';
import interior from './interior.jpg';
import interior1 from './interior1.jpg';
import interior2 from './interior2.jpg';
import interior3 from './interior3.jpg';
import interior4 from './interior4.jpg';
import interior5 from './interior5.jpg';
import interior6 from './interior6.jpg';
import staking from './staking.jpg';
import staking2 from './staking2.jpg';
import landsurvey3 from './landsurvey3.jpg';
import urbanplan from './urbanplan.jpg';
import development from './development.jpg';
import development2 from './development2.jpg';
import urbanplan3 from './urbanplan3.jpg';
import construction2 from './construction2.jpg';
import construction3 from './construction3.jpg';
import construction4 from './construction4.jpg';
import construction5 from './construction5.jpg';
import urbanscaping from './urbanscaping.jpg';
import urbanscaping2 from './urbanscaping2.jpg';

// Missing imports (assuming they exist in your assets folder)
import topography from './topography.jpg';
import topography2 from './topography2.jpg';
import topography3 from './topography3.jpg';
import boundary from './boundary.jpg';
import boundary2 from './boundary2.jpg';
import landsurvey2 from './landsurvey2.jpg';

export const assets = {
  logo,
  logo_dark,
  cross_icon,
  menu_icon,
  star_icon,
  left_arrow,
  right_arrow,
  header_img,
  brand_img,
  project_img_1,
  project_img_2,
  project_img_3,
  project_img_4,
  project_img_5,
  archie,
  BgVideo1,
  BgVideo2,
  BgVideo3,
  construction,
  lands,
  urban1,
  architecture1,
  architecture2,
  architecture3,
  architecture4,
  architecture5,
  architecture6,
  architecture_hero,
  landscape,
  landscaping1,
  landscaping2,
  landscaping3,
  landscaping4,
  landscaping5,
  landscaping6,
  interior,
  interior1,
  interior2,
  interior3,
  interior4,
  interior5,
  interior6,
  staking,
  staking2,
  landsurvey3,
  urbanplan,
  development,
  development2,
  urbanplan3,
  construction2,
  construction3,
  construction4,
  construction5,
  urbanscaping,
  urbanscaping2,
  topography,
  topography2,
  topography3,
  boundary,
  boundary2,
  landsurvey2,
};

export const projectsData = [
    {
      title: "Skyline Haven",
      price: "$2,50,000",
      location: "Harare",
      image: project_img_1
    },
    {
      title: "Vista Verde",
      price: "$2,50,000",
      location: "Masvingo",
      image: project_img_2
    },
    {
      title: "Serenity Suites",
      price: "$2,50,000",
      location: "Chiredzi",
      image: project_img_3
    },
    {
      title: "Central Square",
      price: "$2,50,000",
      location: "Harare",
      image: project_img_4
    },
    {
      title: "Vista Verde",
      price: "$2,50,000",
      location: "Bulawayo",
      image: project_img_5
    },
    
  ];

  export const testimonialsData = [
    {
        name: "Munashe Gwara",
        title: "Network Engineer",
        rating: 5,
        text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched."
    },
    {
        name: "Brighton Pirikisi",
        title: "Bug Bounty Hunter",
        rating: 4,
        text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched."
    },
    {
        name: "Blessing Nyandoro",
        title: "Software Engineer",
        rating: 5,
        text: "From the very first meeting, they understood my vision and helped me find the perfect property. Their attention to detail and commitment to client satisfaction is unmatched."
    }
];
export const background = [
    {"videos": [BgVideo1, BgVideo2]}
];
export const services = [
  {
    title: "Architecture",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
    image:assets.archie,
  },
  {
    title: "Urban Planning",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
    image: assets.urban1,
  },
  {
    title: "Land Surveying",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
    image: assets.lands,
  },
  {
    title: "Construction",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
    image: assets.construction,
  },
];
export const serviceDetails = {
    "Architecture": {
        fullText: "Our architectural philosophy centers on creating spaces that are innovative, highly functional, and deeply sustainable. We leverage modern computational design tools to analyze site specifics, energy consumption, and structural integrity. Our designs are uniquely tailored to client needs while respecting local contexts and materials, ensuring aesthetic excellence and long-term value. We handle everything from concept visualization and schematic design to construction documentation and site supervision. We are committed to designing spaces that are not just structures, but legacies.",
        // You can add more specific data here if needed, like key features or a link
    },
    "Interior Design": {
        fullText: "We specialize in crafting bespoke interior environments that reflect personality and enhance well-being. Our comprehensive process covers spatial planning, furniture selection, lighting design, and material specification. We focus on creating cohesive and luxurious spaces, whether residential or commercial, that are both aesthetically pleasing and ergonomically sound. Our expertise ensures every detail, from color palette to custom millwork, contributes to a harmonious and inviting atmosphere that maximizes functionality and style.",
    },
    "Landscaping": {
        fullText: "Our landscaping services are dedicated to designing sustainable, beautiful, and functional outdoor spaces that harmonize with the surrounding architecture and environment. We handle site analysis, hardscape design (patios, walkways), softscape design (planting, irrigation), and outdoor lighting. We prioritize drought-tolerant and native species to create vibrant, low-maintenance, and eco-friendly gardens and recreational areas, ensuring the longevity and natural integration of your property's exterior.",
    }
};
export const servicespictures = [
  {
    title: "Architecture",
    description: "Modern architectural design across projects.",
    image: assets.architecture3,
  },
  {
    title: "Architecture",
    description: "Another architecture project.",
    image: assets.architecture1,
  },
  {
    title: "Architecture",
    description: "Another architecture project.",
    image: assets.architecture2,
  },
  {
    title: "Architecture",
    description: "Another architecture project.",
    image: assets.architecture6,
  },
  {
    title: "Architecture",
    description: "Another architecture project.",
    image: assets.architecture4,
  },
  {
    title: "Architecture",
    description: "Another architecture project.",
    image: assets.architecture5,
  },
  {
    title: "Architecture",
    description: "Another architecture project.",
    image: assets.architecture_hero,
  },
  {
    title: "Interior Design",
    description: "Beautiful interior concepts.",
    image: assets.interior,
  },
  {
    title: "Interior Design",
    description: "Another interior project.",
    image: assets.interior1,
  },
  {
    title: "Interior Design",
    description: "Another interior project.",
    image: assets.interior2,
  },
  {
    title: "Interior Design",
    description: "Another interior project.",
    image: assets.interior3,
  },
  {
    title: "Interior Design",
    description: "Another interior project.",
    image: assets.interior4,
  },
  {
    title: "Interior Design",
    description: "Another interior project.",
    image: assets.interior5,
  },
  {
    title: "Interior Design",
    description: "Another interior project.",
    image: assets.interior6,
  },
  {
    title: "Landscaping",
    description: "Sustainable and appealing outdoor spaces.",
    image: assets.landscaping1,
  },
  {
    title: "Landscaping",
    description: "Another landscaping project.",
    image: assets.landscaping2,
  },
  {
    title: "Landscaping",
    description: "Another landscaping project.",
    image: assets.landscaping3,
  },
  {
    title: "Landscaping",
    description: "Another landscaping project.",
    image: assets.landscaping4,
  },
  {
    title: "Landscaping",
    description: "Another landscaping project.",
    image: assets.landscaping5,
  },
  {
    title: "Landscaping",
    description: "Another landscaping project.",
    image: assets.landscaping6,
  },
];

export const serviceDetailsUrbanPlanning = {
  "Urban Planning": {
    fullText: "Our urban planning services focus on creating sustainable, functional, and innovative urban environments. We work closely with clients, stakeholders, and local authorities to ensure that each plan meets regulatory standards while optimizing land use, infrastructure, and community needs. Our expertise covers master planning, zoning, site surveys, infrastructure layouts, and 3D visualizations. From concept to implementation, we provide comprehensive planning solutions that enhance livability, connectivity, and environmental sustainability. Every project is designed with a balance of efficiency, aesthetics, and long-term urban resilience in mind.",
  },
  "Land Surveying": {
    fullText: "Land surveying is a critical first step in urban planning and development. We provide precise measurements, site analysis, and topographical mapping to inform design decisions. Our survey data ensures accurate zoning, infrastructure planning, and property delineation. By combining traditional surveying techniques with modern technology, including GPS and GIS tools, we deliver reliable, actionable insights for every urban project.",
  },
  "Community Development": {
    fullText: "Community development services focus on enhancing the social, economic, and environmental well-being of urban areas. We plan public spaces, recreational areas, and community facilities that foster engagement and cohesion. Our designs integrate sustainable practices, promote accessibility, and support long-term growth and resilience. Every plan is tailored to the unique needs of the community while aligning with broader urban planning objectives.",
  }
};

export const servicespicturesUrbanPlanning = [
  {
    title: "Urban Planning",
    description: "Masterplan overview and site layouts.",
    image: assets.urbanscaping,
  },
  {
    title: "Urban Planning",
    description: "Infrastructure planning and zoning.",
    image: assets.urbanplan3,
  },
  {
    title: "Urban Planning",
    description: "Urban design visualization.",
    image: assets.urbanplan,
  },
  {
    title: "Urban Planning",
    description: "Detailed planning and site survey.",
    image: assets.architecture3,
  },
  {
    title: "Urban Planning",
    description: "Community development integration.",
    image: assets.architecture4,
  },
  {
    title: "Urban Planning",
    description: "Sustainable city design concepts.",
    image: assets.architecture5,
  },
  {
    title: "Urban Planning",
    description: "Project implementation and oversight.",
    image: assets.urbanplan,
  },
  {
    title: "Land Surveying",
    description: "Accurate site measurement and mapping.",
    image: assets.topography2,
  },
  {
    title: "Land Surveying",
    description: "Topographical surveys for planning.",
    image: assets.topography3,
  },
  {
    title: "Land Surveying",
    description: "Survey data integration with masterplans.",
    image: assets.topography,
  },
  {
    title: "Community Development",
    description: "Public space and recreational planning.",
    image: assets.development2,
  },
  {
    title: "Community Development",
    description: "Sustainable and accessible facilities.",
    image: assets.landscaping1,
  },
  {
    title: "Community Development",
    description: "Community-centric urban design.",
    image: assets.landscaping2,
  }
];

export const serviceDetailsLandSurveying = {
  "Boundary Surveying": {
    fullText: "Boundary surveying establishes legal property lines, helping clients verify property ownership and avoid disputes. We combine field measurements, GPS, and GIS technology to produce accurate boundary maps and documentation for planning, construction, and legal purposes.",
  },
  "Topographic Surveying": {
    fullText: "Topographic surveys map land contours, elevations, and existing features to guide design and construction. Our surveys provide detailed 2D and 3D data for master planning, infrastructure development, and landscape design, ensuring precise, reliable planning decisions.",
  },
  "Construction Staking": {
    fullText: "Construction staking transfers the building plans onto the physical site, marking key points for excavation, foundations, and infrastructure placement. This ensures that projects are built accurately according to design specifications and regulatory standards.",
  },
};

export const servicespicturesLandSurveying = [
  {
    title: "Boundary Surveying",
    description: "Precise property boundary measurement and mapping.",
    image: assets.landsurvey3,
  },
  {
    title: "Boundary Surveying",
    description: "Survey data integrated for legal documentation.",
    image: assets.boundary,
  },
  {
    title: "Boundary Surveying",
    description: "Field verification with modern surveying tools.",
    image: assets.landsurvey2,
  },
  {
    title: "Topographic Surveying",
    description: "Land elevation mapping for planning and design.",
    image: assets.topography,
  },
  {
    title: "Topographic Surveying",
    description: "Contour and feature mapping with GPS & GIS.",
    image: assets.topography3,
  },
  {
    title: "Topographic Surveying",
    description: "3D visualization for precise site planning.",
    image: assets.urbanscaping,
  },
  {
    title: "Construction Staking",
    description: "Marking foundations and infrastructure points.",
    image: assets.construction2,
  },
  {
    title: "Construction Staking",
    description: "Ensuring design accuracy on-site.",
    image: assets.staking2,
  },
  {
    title: "Construction Staking",
    description: "Supporting project execution with precise staking.",
    image: assets.construction3,
  },
];
export const serviceDetailsConstruction = {
  "Interior Finishes": {
    fullText: "Our interior finishes services transform spaces with high-quality craftsmanship, selecting materials and designs that reflect your style. We handle flooring, wall finishes, ceilings, cabinetry, and fittings, ensuring every detail aligns with your vision and standards.",
  },
  "Building Construction": {
    fullText: "We provide comprehensive building construction solutions, from foundations and structural frameworks to roofing and utilities. Our team ensures safety, efficiency, and adherence to design specifications, delivering durable and functional structures.",
  },
  "Landscape Development": {
    fullText: "Landscape development enhances outdoor environments with creative and sustainable solutions. We design and construct gardens, pathways, lighting, and irrigation systems, integrating aesthetics and functionality to complement your building projects.",
  },
};

export const servicespicturesConstruction = [
  {
    title: "Interior Finishes",
    description: "High-quality flooring, walls, and ceilings.",
    image: assets.interior,
  },
  {
    title: "Interior Finishes",
    description: "Custom cabinetry and built-in furniture.",
    image: assets.interior1,
  },
  {
    title: "Interior Finishes",
    description: "Modern fixtures and interior detailing.",
    image: assets.interior2,
  },
  {
    title: "Building Construction",
    description: "Structural frameworks and foundations.",
    image: assets.construction2,
  },
  {
    title: "Building Construction",
    description: "Roofing, utilities, and infrastructure.",
    image: assets.construction3,
  },
  {
    title: "Building Construction",
    description: "Construction progress and site planning.",
    image: assets.construction4,
  },
  {
    title: "Landscape Development",
    description: "Garden and outdoor area planning.",
    image: assets.urbanscaping,
  },
  {
    title: "Landscape Development",
    description: "Pathways, lighting, and irrigation systems.",
    image: assets.construction2,
  },
  {
    title: "Landscape Development",
    description: "Sustainable landscape design execution.",
    image: assets.construction5,
  },
];

