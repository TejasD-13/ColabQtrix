import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean up existing data
  await prisma.section.deleteMany();
  await prisma.page.deleteMany();

  // Create the home page
  const homePage = await prisma.page.create({
    data: {
      slug: 'home',
      title: 'ColabQtrix Technologies — Home',
      isPublished: true,
    },
  });

  console.log(`✅ Created page: ${homePage.slug}`);

  // Seed all 9 sections
  const sections = [
    {
      pageId: homePage.id,
      type: 'navbar',
      order: 1,
      content: {
        componentId: 'navbar_001',
        logo: {
          text: 'ColabQtrix Technologies',
          icon: '/logo.svg',
        },
        links: [
          { label: 'Home', href: '#home' },
          { label: 'Careers', href: '/Careers.html' },
          { label: 'Contact', href: '#contact' },
        ],
        contactInfo: {
          email: 'contact@colabqtrix.com',
          phone: '(+91) - 87998 73735',
        },
      },
    },
    {
      pageId: homePage.id,
      type: 'hero',
      order: 2,
      content: {
        componentId: 'hero_001',
        title: 'Data, Design, Disruption, Delivered',
        subtitle: 'Collaborating towards tomorrow\'s tech breakthroughs.',
        primaryButton: {
          label: 'Join Us',
          href: '#contact',
        },
        secondaryButton: {
          label: 'Contact Us',
          href: '#contact',
        },
        image: 'https://colabqtrix.com/images/hero-graphic.png',
      },
    },
    {
      pageId: homePage.id,
      type: 'about',
      order: 3,
      content: {
        componentId: 'about_001',
        badge: 'ABOUT US',
        heading: 'We provide prompt, personal, and reliable support to every client.',
        description:
          'ColabQtrix Technologies is a forward-thinking technology firm committed to delivering cutting-edge software solutions. We specialize in creating intelligent digital systems that are scalable, secure, and user-focused.',
        vision:
          'To be a global catalyst for digital innovation by delivering intelligent, reliable, and future-ready technology solutions that empower businesses and accelerate transformation.',
        mission:
          'To deliver user-centric designs, intuitive platforms, and high-quality software that simplify complex business processes and drive sustainable growth.',
      },
    },
    {
      pageId: homePage.id,
      type: 'why_choose_us',
      order: 4,
      content: {
        componentId: 'why_choose_us_001',
        badge: 'WHY CHOOSE US',
        heading: 'Why Choose Us',
        description:
          'We help businesses transform, scale, and succeed in the digital era with our comprehensive technology solutions.',
        features: [
          {
            id: 'f1',
            title: 'End-to-End Software Solutions',
            description:
              'Custom web and mobile application development tailored to your unique business requirements with modern, scalable architecture.',
            icon: 'code',
          },
          {
            id: 'f2',
            title: 'Business & Digital Strategy Consulting',
            description:
              'Market research, competitor benchmarking, and strategic planning to position your business for sustainable growth.',
            icon: 'strategy',
          },
          {
            id: 'f3',
            title: 'Post-Deployment Support & AMC',
            description:
              'Proactive maintenance and 24/7 assistance ensuring your systems always run at peak performance after launch.',
            icon: 'support',
          },
          {
            id: 'f4',
            title: 'R&D and Technology Consultancy',
            description:
              'Validating concepts and building prototypes using emerging technologies to keep your business ahead of the curve.',
            icon: 'research',
          },
        ],
      },
    },
    {
      pageId: homePage.id,
      type: 'founder',
      order: 5,
      content: {
        componentId: 'founder_001',
        badge: 'FROM FOUNDER DESK',
        heading: 'Message',
        quote:
          'It gives me immense pride to introduce ColabQtrix Technologies LLP. Our mission is to empower startups, SMEs, and enterprises with software that\'s not just functional — but transformative. We are building a future where technology bridges the gap between ambition and achievement.',
        founderName: 'Parth Ghetiya',
        founderTitle: 'Founder & CEO',
        founderImage: 'https://colabqtrix.com/images/founder.jpg',
      },
    },
    {
      pageId: homePage.id,
      type: 'how_it_works',
      order: 6,
      content: {
        componentId: 'how_it_works_001',
        badge: 'HOW IT WORKS',
        heading: 'How It Works',
        steps: [
          {
            id: 's1',
            stepNumber: 1,
            title: 'Connect with Us',
            description:
              'Reach out to discuss your vision, challenges, and goals. We listen carefully to understand your unique needs.',
          },
          {
            id: 's2',
            stepNumber: 2,
            title: 'Tailor the Solution',
            description:
              'We build a custom technology roadmap aligned with your business objectives and budget.',
          },
          {
            id: 's3',
            stepNumber: 3,
            title: 'Build & Integrate',
            description:
              'Our expert team develops, tests, and seamlessly deploys your solution with minimal disruption.',
          },
          {
            id: 's4',
            stepNumber: 4,
            title: 'Support & Grow',
            description:
              'Ongoing AMC, monitoring, and strategic advice to help your business scale confidently.',
          },
        ],
      },
    },
    {
      pageId: homePage.id,
      type: 'testimonials',
      order: 7,
      content: {
        componentId: 'testimonials_001',
        heading: 'What Our Users Are Saying',
        testimonials: [
          {
            id: 't1',
            role: 'Researcher',
            text: 'ColabQtrix delivered exceptional reliability and precision. Their platform handled our complex research workflows flawlessly, enabling us to focus on innovation rather than infrastructure.',
            rating: 5,
          },
          {
            id: 't2',
            role: 'Academician',
            text: 'The team was incredibly responsive and proactive. They understood our academic requirements and built a system that truly enhances the learning experience for our students and faculty.',
            rating: 5,
          },
          {
            id: 't3',
            role: 'Education Institute',
            text: 'Zero downtime and outstanding support since day one. ColabQtrix has been a trusted technology partner for our institution, delivering beyond our expectations at every milestone.',
            rating: 5,
          },
        ],
      },
    },
    {
      pageId: homePage.id,
      type: 'contact',
      order: 8,
      content: {
        componentId: 'contact_001',
        heading: 'Contact Us',
        subheading:
          'Utilize our tools to develop your concepts into powerful digital realities. Let\'s build something great together.',
        phones: ['+91 87998 73735', '+91 98765 43210'],
        emails: ['contact@colabqtrix.com', 'support@colabqtrix.com'],
        address: 'Pune, Maharashtra, India',
        mapEmbedUrl:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.1!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPune!5e0!3m2!1sen!2sin!4v1234567890',
      },
    },
    {
      pageId: homePage.id,
      type: 'footer',
      order: 9,
      content: {
        componentId: 'footer_001',
        about:
          'ColabQtrix Technologies is a forward-thinking technology firm delivering cutting-edge software solutions that empower businesses to grow.',
        companyLinks: [
          { label: 'About Us', href: '#about' },
          { label: 'Careers', href: '/Careers.html' },
          { label: 'Terms & Conditions', href: '/terms' },
          { label: 'Privacy Policy', href: '/privacy' },
        ],
        contact: {
          address: 'Pune, Maharashtra, India',
          email: 'contact@colabqtrix.com',
          phone: '(+91) - 87998 73735',
        },
        copyright: `© ${new Date().getFullYear()} ColabQtrix Technologies LLP. All rights reserved.`,
      },
    },
  ];

  for (const section of sections) {
    await prisma.section.create({ data: section });
    console.log(`✅ Seeded section: ${section.type} (order: ${section.order})`);
  }

  console.log('\n🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
