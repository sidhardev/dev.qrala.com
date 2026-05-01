<?php
// Redirect to the desired URL

// Optional: Stop further script execution
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="google-site-verification" content="m4eX5MvbCnUOPaPx8D-QemHwpVmr3BBH0GDVrzdDiGc" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    
    <!-- Essential SEO Meta Tags -->
    <meta name="description" content="Dev Sidhar - Freelance Web Developer creating simple, purposeful web solutions for creators and businesses. Specializing in clean, efficient web development and digital tools." />
    <meta name="keywords" content="web developer, freelance developer, web design, web development, Dev Sidhar, simple tools, business tools, creator tools, website development, digital solutions" />
    <meta name="author" content="Dev Sidhar" />
    <meta name="robots" content="index, follow" />
    
    <!-- Favicons and Icons -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://dev.qrala.com/" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://dev.qrala.com/" />
    <meta property="og:title" content="Dev Sidhar — Freelance Web Developer | Simple, Purposeful Web Solutions" />
    <meta property="og:description" content="Dev Sidhar - Freelance Web Developer creating simple, purposeful web solutions for creators and businesses. Specializing in clean, efficient web development and digital tools." />
    <meta property="og:image" content="https://dev.qrala.com/og-image.jpg" />
    <meta property="og:image:alt" content="Dev Sidhar - Web Developer Portfolio" />
    <meta property="og:site_name" content="Dev Sidhar Portfolio" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://dev.qrala.com/" />
    <meta property="twitter:title" content="Dev Sidhar — Freelance Web Developer | Simple, Purposeful Web Solutions" />
    <meta property="twitter:description" content="Dev Sidhar - Freelance Web Developer creating simple, purposeful web solutions for creators and businesses. Specializing in clean, efficient web development and digital tools." />
    <meta property="twitter:image" content="https://dev.qrala.com/og-image.jpg" />
    <meta property="twitter:image:alt" content="Dev Sidhar - Web Developer Portfolio" />
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Dev Sidhar",
      "url": "https://dev.qrala.com/",
      "image": "https://dev.qrala.com/profile.jpg",
      "sameAs": [
        "https://twitter.com/sidhar_dev"
      ],
      "jobTitle": "Freelance Web Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Dev Sidhar"
      },
      "description": "Dev Sidhar is a freelance web developer creating simple, purposeful web solutions for creators and businesses."
    }
    </script>
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Dev Sidhar Portfolio",
      "url": "https://dev.qrala.com/",
      "description": "Portfolio of Dev Sidhar, a freelance web developer creating simple, purposeful web solutions for creators and businesses.",
      "publisher": {
        "@type": "Person",
        "name": "Dev Sidhar"
      }
    }
    </script>
    
    <!-- Title -->
    <title>Dev Sidhar — Freelance Web Developer | Simple, Purposeful Web Solutions</title>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <style>
    :root {
      --bg: #f9f9f8;
      --text: #1a1a1a;
      --muted: #6b6b6b;
      --card: #ffffff;
      --border: #e7e7e7;
      font-family: 'Inter', sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      display: flex;
      justify-content: center;
      padding: 60px 20px;
      line-height: 1.6;
    }
    .wrap {
      width: 100%;
      max-width: 800px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0,0,0,0.04);
    }
    header {
      padding: 32px 36px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo {
      width: 44px; height: 44px;
      border: 1px solid var(--border);
      border-radius: 10px;
      display: grid;
      place-items: center;
      font-weight: 600;
      color: var(--text);
      background: #fafafa;
      font-size: 16px;
      letter-spacing: 0.5px;
    }
    .brand h1 { font-size: 17px; font-weight: 600; letter-spacing: 0.3px; }
    header p { font-size: 13px; color: var(--muted); }

    main {
      padding: 40px 36px;
      display: grid;
      gap: 60px;
    }
    section {
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.8s ease;
    }
    section.show {
      opacity: 1;
      transform: translateY(0);
    }

    h2 {
      font-size: 21px;
      margin-bottom: 10px;
      font-weight: 600;
    }
    p {
      color: var(--muted);
      font-size: 15px;
    }

    .projects {
      display: grid;
      gap: 18px;
    }

    .project {
      display: block;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 18px 20px;
      text-decoration: none;
      color: inherit;
      background: var(--card);
      transition: all 0.4s ease;
      cursor: pointer;
      position: relative;
    }
    .project:hover {
      box-shadow: 0 6px 22px rgba(0,0,0,0.05);
      transform: translateY(-2px);
    }
    .project strong {
      display: block;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .project p {
      font-size: 14px;
      color: var(--muted);
    }

    .social {
      display: flex;
      gap: 16px;
      margin-top: 14px;
    }
    .social a {
      text-decoration: none;
      color: var(--text);
      font-size: 14px;
      border-bottom: 1px solid transparent;
      transition: all 0.3s ease;
    }
    .social a:hover {
      border-color: var(--text);
      opacity: 0.8;
    }

    footer {
      padding: 22px 36px;
      border-top: 1px solid var(--border);
      text-align: center;
      font-size: 13px;
      color: var(--muted);
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.8s ease;
    }
    footer.show {
      opacity: 1;
      transform: translateY(0);
    }

    html { scroll-behavior: smooth; }
    
    /* Modal Styles */
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      backdrop-filter: blur(4px);
      animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
      background: var(--card);
      margin: 15% auto;
      padding: 30px;
      border: 1px solid var(--border);
      border-radius: 14px;
      width: 90%;
      max-width: 400px;
      text-align: center;
      box-shadow: 0 12px 30px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from {opacity: 0;}
      to {opacity: 1;}
    }
    
    @keyframes slideIn {
      from {transform: translateY(-50px); opacity: 0;}
      to {transform: translateY(0); opacity: 1;}
    }
    
    .modal h2 {
      font-size: 20px;
      margin-bottom: 20px;
      font-weight: 600;
    }
    
    .modal-buttons {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 25px;
    }
    
    .modal-btn {
      padding: 10px 20px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--card);
      color: var(--text);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .modal-btn.primary {
      background: #1a1a1a;
      color: white;
      border-color: #1a1a1a;
    }
    
    .modal-btn:hover {
      opacity: 0.8;
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <!-- Modal -->
  <div id="whatsappModal" class="modal">
    <div class="modal-content">
      <h2>Open Whatsapp Status generator?</h2>
      <p>Create amazing WhatsApp statuses with our easy-to-use generator</p>
      <div class="modal-buttons">
        <button id="cancelBtn" class="modal-btn">Cancel</button>
        <button id="openBtn" class="modal-btn primary">Open</button>
      </div>
    </div>
  </div>
  
  <div class="wrap">
    <header>
      <div class="brand">
        <div class="logo">DS</div>
        <h1>Dev Sidhar</h1>
      </div>
      <p>Professional Web Developer & Digital Creator</p>
    </header>

    <main>
      <section>
        <h2>About Dev Sidhar</h2>
        <p>I'm Dev Sidhar, a professional web developer and digital creator who specializes in building simple, purposeful tools for creators and businesses. With expertise in SEO optimization and digital solutions, I focus on clarity over complexity to deliver exceptional web experiences.</p>
        <div class="social">
          <a href="https://twitter.com/sidhar_dev" target="_blank" rel="noopener noreferrer">Twitter ↗</a>
        </div>
      </section>

      <section>
        <h2>Featured Projects by Dev Sidhar</h2>
        <div class="projects">
          <a href="https://dev.qrala.com/whatsai" target="_blank" class="project" id="whatsappGeneratorLink">
            <strong>Poster Generator</strong>
            <p>Create elegant promotional posters in seconds with AI assistance. A powerful tool developed by Dev Sidhar for creators and businesses.</p>
          </a>

          <a href="https://dev.qrala.com/ai_image" target="_blank" class="project">
            <strong>Gemini Image Generator</strong>
            <p>Generate clean, creative visuals using Gemini AI — minimal yet powerful. Another innovative solution crafted by Dev Sidhar.</p>
          </a>

          <a href="https://dev.qrala.com/gappubot" target="_blank" class="project">
            <strong>GappuBot</strong>
            <p>A friendly, child-like chatbot designed for fun and conversation. Created by Dev Sidhar as a digital companion tool.</p>
          </a>
        </div>
      </section>
      
      <section>
        <h2>Why Choose Dev Sidhar for Your Digital Needs</h2>
        <p>As a skilled web developer and SEO expert, Dev Sidhar delivers tailored digital solutions that drive results. Whether you need a stunning website, SEO optimization, or custom digital tools, choosing Dev Sidhar means choosing clarity, efficiency, and purposeful design.</p>
      </section>
    </main>

    <footer>
      <p>© <span itemprop="copyrightYear">2025</span> <span itemprop="copyrightHolder">Dev Sidhar</span> · Professional Web Developer & Digital Creator</p>
    </footer>
  </div>

  <script>
    // Show modal on page load
    window.onload = function() {
      setTimeout(function() {
        document.getElementById('whatsappModal').style.display = 'block';
      }, 1000);
    };
    
    // Modal button handlers
    document.getElementById('openBtn').addEventListener('click', function() {
      window.open('https://dev.qrala.com/imgquick', '_blank');
      document.getElementById('whatsappModal').style.display = 'none';
    });
    
    document.getElementById('cancelBtn').addEventListener('click', function() {
      document.getElementById('whatsappModal').style.display = 'none';
    });
    
    // Close modal if clicked outside
    window.addEventListener('click', function(event) {
      const modal = document.getElementById('whatsappModal');
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
    
    // Existing scroll reveal functionality
    const sections = document.querySelectorAll('section');
    const footer = document.querySelector('footer');
    const reveal = () => {
      sections.forEach(s => {
        const top = s.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) s.classList.add('show');
      });
      if (footer.getBoundingClientRect().top < window.innerHeight - 50)
        footer.classList.add('show');
    };
    window.addEventListener('scroll', reveal);
    reveal();
  </script>
</body>
</html>
