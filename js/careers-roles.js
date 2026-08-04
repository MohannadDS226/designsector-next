window.DS = window.DS || {};

DS.initCareersRoles = function () {
  const container = document.querySelector('[data-careers-roles]');
  if (!container) return;

  const departments = [
    {
      name: 'Architecture',
      slug: 'architecture',
      scope: 'Architecture / Master Planning / Landscape',
      roles: [
        {
          title: 'Junior Architect',
          level: 'Junior',
          description: 'Support architecture projects from early concepts through coordinated drawing packages, contributing clear ideas, careful modelling, and dependable documentation.',
          requirements: ['Degree in Architecture or a related field.', 'Strong design portfolio and visual communication skills.', 'Working knowledge of AutoCAD, Revit, and Adobe tools.'],
          responsibilities: ['Develop drawings, diagrams, models, and presentations.', 'Research materials, precedents, and site context.', 'Coordinate revisions with senior architects and other disciplines.']
        },
        {
          title: 'Senior Architect',
          level: 'Senior',
          description: 'Lead the design and technical development of architecture projects, translating strong concepts into coordinated, buildable solutions across scales.',
          requirements: ['Professional architecture degree and relevant project experience.', 'Advanced design, detailing, and multidisciplinary coordination skills.', 'Strong command of Revit, AutoCAD, and presentation workflows.'],
          responsibilities: ['Develop concepts, design packages, and technical documentation.', 'Guide junior architects and review project output.', 'Coordinate consultants and respond to client feedback.']
        },
        {
          title: 'Landscape Architect',
          level: 'Specialist',
          description: 'Develop landscape strategies as an integrated part of the architecture department, connecting buildings, public realm, planting, movement, and climate response.',
          requirements: ['Degree in Landscape Architecture, Architecture, or a related field.', 'Portfolio showing site planning, planting, hardscape, and spatial design.', 'Strong CAD, 3D, documentation, and presentation skills.'],
          responsibilities: ['Develop landscape concepts, plans, palettes, and details.', 'Coordinate levels, drainage, lighting, irrigation, and external works.', 'Work with architects and visualizers to preserve one coherent project vision.']
        },
        {
          title: 'Architecture Team Leader',
          level: 'Team Leader',
          description: 'Direct the architecture team across concept, master planning, landscape integration, and technical delivery while protecting project vision, programme, and quality.',
          requirements: ['Proven experience leading complex architecture projects and teams.', 'Excellent design judgment, technical knowledge, and client communication.', 'Ability to plan resources, priorities, reviews, and deadlines.'],
          responsibilities: ['Set project direction, milestones, standards, and responsibilities.', 'Lead design reviews and resolve cross-discipline coordination issues.', 'Mentor the team and present work confidently to clients.']
        }
      ]
    },
    {
      name: 'Interior Design',
      slug: 'interior-design',
      scope: 'Concept / Space / Detail / FF&E',
      roles: [
        {
          title: 'Junior Interior Designer',
          level: 'Junior',
          description: 'Support thoughtful interior environments through research, space planning, material studies, presentation work, and detailed documentation.',
          requirements: ['Degree in Interior Design, Architecture, or a related field.', 'Strong portfolio showing composition, materials, and spatial thinking.', 'Working knowledge of AutoCAD, 3D software, and Adobe tools.'],
          responsibilities: ['Prepare mood boards, layouts, material palettes, and drawings.', 'Source finishes, furniture, fixtures, and references.', 'Update packages accurately through design revisions.']
        },
        {
          title: 'Senior Interior Designer',
          level: 'Senior',
          description: 'Own interior design packages from narrative and spatial strategy through material specification, detailing, coordination, and client presentation.',
          requirements: ['Relevant professional experience across concept and delivery stages.', 'Strong knowledge of materials, furniture, detailing, and specifications.', 'Clear presentation, coordination, and problem-solving skills.'],
          responsibilities: ['Lead concepts, layouts, palettes, details, and specifications.', 'Review junior work and coordinate with architecture and visualization.', 'Manage client comments without losing design intent.']
        },
        {
          title: 'FF&E Designer',
          level: 'Specialist',
          description: 'Shape the furniture, fixtures, and equipment layer of each interior, balancing concept, comfort, specification, sourcing, budget, and delivery.',
          requirements: ['Interior or product design background with a strong FF&E portfolio.', 'Knowledge of furniture, fabrics, finishes, suppliers, and specifications.', 'Strong scheduling, presentation, and commercial awareness.'],
          responsibilities: ['Build FF&E concepts, schedules, specifications, and sample boards.', 'Source, compare, and coordinate suppliers and custom pieces.', 'Track approvals, substitutions, budgets, procurement, and installation.']
        },
        {
          title: 'Interior Design Team Leader',
          level: 'Team Leader',
          description: 'Lead the interior design team, shaping creative direction and coordinating every package from the first client brief to final site delivery.',
          requirements: ['Proven leadership across high-quality interior design projects.', 'Excellent creative direction, technical review, and client management.', 'Ability to balance design ambition, programme, budget, and buildability.'],
          responsibilities: ['Set the design language and maintain consistency across projects.', 'Assign work, lead reviews, mentor designers, and track delivery.', 'Coordinate decisions with architecture, visualization, and construction.']
        }
      ]
    },
    {
      name: 'Visualization',
      slug: 'visualization',
      scope: 'CGI / Film / AI / Digital Craft',
      roles: [
        {
          title: 'Junior Visualization Artist',
          level: 'Junior',
          description: 'Translate architecture, interiors, and landscape into compelling imagery through accurate modelling, materials, lighting, and post-production.',
          requirements: ['Portfolio demonstrating composition, lighting, materials, and architectural accuracy.', 'Working knowledge of 3ds Max, Corona Renderer, and Photoshop, including modelling, UV mapping, materials, lighting, cameras, and render setup.', 'Working familiarity with Forest Pack and RailClone for vegetation, scattering, parametric geometry, and efficient scene assembly.', 'Ability to read architectural drawings and organise imported CAD or Revit geometry, assets, layers, naming, and file paths.', 'Familiarity with AI-assisted image enhancement and post-production while preserving the approved design, materials, and visual consistency.', 'Basic animation, Premiere Pro, After Effects, or Phoenix knowledge is an advantage.'],
          responsibilities: ['Prepare models, cameras, materials, lighting, and test renders.', 'Build scenes efficiently using studio standards and asset libraries.', 'Apply feedback accurately and support final post-production.']
        },
        {
          title: 'Senior Visualization Artist',
          level: 'Senior',
          description: 'Create campaign-quality architectural imagery and motion, shaping the visual story while maintaining design accuracy, realism, and consistent art direction.',
          requirements: ['Advanced portfolio across architectural, interior, and landscape visualization, demonstrating strong art direction and campaign-quality delivery.', 'Advanced 3ds Max and Corona Renderer skills covering complex modelling, materials, lighting, cameras, render elements, animation, optimization, and troubleshooting.', 'Advanced Forest Pack and RailClone skills, with working Phoenix knowledge where simulations are required, plus disciplined proxy, vegetation, and high-poly asset management.', 'Advanced Photoshop post-production and working knowledge of Premiere Pro and After Effects for animation, editing, compositing, and final delivery.', 'Strong experience integrating AI-assisted enhancement, editing, and upscaling into production while protecting geometry, materials, design intent, and consistency across a full image set.', 'Confident handling of CAD or Revit imports, colour management, scene organization, network or distributed rendering, deadlines, and technical problem-solving.'],
          responsibilities: ['Own images from camera concept through final delivery.', 'Guide junior artists and review visual and technical quality.', 'Coordinate closely with designers to protect the approved design.']
        },
        {
          title: 'Visualization Team Leader',
          level: 'Team Leader',
          description: 'Lead the department’s creative and production direction, building a reliable pipeline for premium stills, animation, and emerging digital workflows.',
          requirements: ['Proven leadership of architectural visualization teams and complex still-image or animation projects.', 'Expert command of 3ds Max, Corona Renderer, Forest Pack, RailClone, and Photoshop, with strong oversight of Phoenix, Premiere Pro, After Effects, real-time, and AI-assisted workflows.', 'Ability to design and maintain production standards for scene templates, naming, folder structures, asset libraries, colour management, render elements, animation, and final delivery.', 'Strong knowledge of render optimization, network or distributed rendering, hardware and plugin planning, version control, backups, troubleshooting, and technical quality assurance.', 'Ability to evaluate and supervise AI tools responsibly, preserving design accuracy, authorship, material consistency, and campaign-wide visual continuity.', 'Expert art direction, resource planning, review, mentoring, deadline management, and cross-discipline communication.'],
          responsibilities: ['Set art direction, quality benchmarks, schedules, and workflows.', 'Allocate resources and lead reviews from briefing to delivery.', 'Develop the team, production pipeline, and responsible use of new tools.']
        }
      ]
    },
    {
      name: 'Construction',
      slug: 'construction',
      scope: 'Technical / Site / Delivery',
      roles: [
        {
          title: 'Junior Site Architect',
          level: 'Junior',
          description: 'Support the site and technical team with accurate documentation, inspections, coordination, and reporting that translate approved design into built work.',
          requirements: ['Degree in Architecture, Construction, or a related field.', 'Understanding of drawings, specifications, and site procedures.', 'Organised communication and careful documentation habits.'],
          responsibilities: ['Assist with inspections, reports, submittals, and drawing updates.', 'Track site observations and communicate required actions.', 'Coordinate information between site, technical, and design teams.']
        },
        {
          title: 'Senior Site Architect',
          level: 'Senior',
          description: 'Coordinate technical and site delivery, resolving construction issues while maintaining approved design intent, quality standards, and programme priorities.',
          requirements: ['Relevant experience in site supervision and technical coordination.', 'Strong knowledge of materials, detailing, sequencing, and quality control.', 'Confident communication with contractors, consultants, and designers.'],
          responsibilities: ['Review shop drawings, materials, mock-ups, and site execution.', 'Resolve RFIs and coordinate technical decisions across disciplines.', 'Report progress, risks, quality issues, and corrective action.']
        },
        {
          title: 'Junior Site Engineer',
          level: 'Junior',
          description: 'Support day-to-day site execution through inspections, measurements, quantity tracking, technical coordination, and accurate progress documentation.',
          requirements: ['Degree in Civil Engineering, Construction Engineering, or a related field.', 'Understanding of drawings, quantities, construction methods, and site safety.', 'Strong organisation, reporting, and practical problem-solving skills.'],
          responsibilities: ['Monitor daily works, inspections, quantities, and subcontractor progress.', 'Check execution against drawings, specifications, and approved methods.', 'Record site issues and coordinate actions with senior engineers and consultants.']
        },
        {
          title: 'Senior Site Engineer',
          level: 'Senior',
          description: 'Manage site execution and engineering coordination, ensuring that construction methods, resources, quality, safety, and programme remain controlled.',
          requirements: ['Relevant experience delivering construction or fit-out projects on site.', 'Strong knowledge of methods, quantities, sequencing, quality, and safety.', 'Confident leadership of subcontractors and coordination with consultants.'],
          responsibilities: ['Plan and supervise work fronts, resources, inspections, and handovers.', 'Review method statements, quantities, progress, and technical constraints.', 'Resolve execution issues and report programme, quality, and delivery risks.']
        },
        {
          title: 'Construction Team Leader',
          level: 'Team Leader',
          description: 'Lead construction coordination and site delivery, aligning teams, decisions, quality, cost awareness, and programme from mobilisation through handover.',
          requirements: ['Proven leadership across complex construction or fit-out projects.', 'Excellent technical judgment, planning, negotiation, and reporting.', 'Ability to manage teams and protect design quality under site pressure.'],
          responsibilities: ['Set delivery priorities, responsibilities, reviews, and escalation paths.', 'Lead coordination with clients, consultants, contractors, and designers.', 'Monitor quality, programme, documentation, close-out, and handover.']
        }
      ]
    },
    {
      name: 'Business Development',
      slug: 'business-development',
      scope: 'Growth / Proposals / Client Partnerships',
      roles: [
        {
          title: 'Business Development Executive',
          level: 'Junior',
          description: 'Support the studio’s growth by researching opportunities, maintaining relationships, and helping prepare clear, tailored proposals and presentations.',
          requirements: ['Degree in Business, Marketing, Architecture, or a related field.', 'Strong research, writing, presentation, and communication skills.', 'Interest in architecture, design, and the MENA market.'],
          responsibilities: ['Research leads, markets, clients, and potential partnerships.', 'Maintain opportunity records, credentials, and proposal materials.', 'Coordinate introductions, meetings, follow-ups, and submissions.']
        },
        {
          title: 'Senior Business Development Executive',
          level: 'Senior',
          description: 'Develop qualified opportunities and long-term client relationships while coordinating competitive proposals that represent the studio clearly and confidently.',
          requirements: ['Relevant business development experience in design or construction.', 'Strong network, commercial judgment, negotiation, and proposal skills.', 'Ability to coordinate senior stakeholders and multiple opportunities.'],
          responsibilities: ['Own selected leads from qualification through proposal and follow-up.', 'Build relationships with clients, partners, and industry stakeholders.', 'Shape pitch strategy with leadership and project teams.']
        },
        {
          title: 'Business Development Manager',
          level: 'Team Leader',
          description: 'Set and lead the studio’s growth strategy, building a healthy opportunity pipeline and positioning Design Sector for the right clients, markets, and partnerships.',
          requirements: ['Proven leadership in business development for the built environment.', 'Excellent commercial strategy, relationship management, and negotiation.', 'Strong understanding of regional markets and professional services.'],
          responsibilities: ['Define growth priorities, targets, partnerships, and market plans.', 'Lead major pitches, negotiations, and client relationship strategy.', 'Track pipeline performance and align opportunities with studio capacity.']
        }
      ]
    },
    {
      name: 'Marketing & Communications',
      slug: 'marketing-communications',
      scope: 'Brand / Content / Graphic Design / Film',
      roles: [
        {
          title: 'Marketing Specialist',
          level: 'Specialist',
          description: 'Plan and deliver studio marketing across channels, turning projects, people, and ideas into consistent stories that grow brand awareness and engagement.',
          requirements: ['Background in marketing, communications, or a related field.', 'Strong copywriting, content planning, analytics, and coordination skills.', 'Awareness of architecture, design, and visual culture.'],
          responsibilities: ['Manage content calendars, campaigns, channels, and reporting.', 'Coordinate project stories, news, awards, and studio announcements.', 'Track performance and refine content using clear insights.']
        },
        {
          title: 'Graphic Designer',
          level: 'Creative',
          description: 'Translate the Design Sector identity into precise visual communication across social media, proposals, presentations, publications, and campaigns.',
          requirements: ['Strong graphic design portfolio with typography and layout skills.', 'Advanced Adobe Creative Cloud knowledge.', 'Ability to work within and extend an established brand system.'],
          responsibilities: ['Design campaign assets, decks, templates, and editorial layouts.', 'Prepare production-ready digital and print artwork.', 'Maintain visual consistency across every studio touchpoint.']
        },
        {
          title: 'Video Editor',
          level: 'Creative',
          description: 'Craft studio and project footage into refined films, reels, interviews, and social content with strong rhythm, narrative, sound, and brand consistency.',
          requirements: ['Editing portfolio demonstrating pacing, storytelling, and sound sense.', 'Advanced Premiere Pro and After Effects skills.', 'Understanding of formats, colour, delivery, and social platforms.'],
          responsibilities: ['Edit project films, reels, interviews, and campaign content.', 'Create motion graphics, titles, sound mixes, and platform versions.', 'Organise footage and collaborate with marketing and visualization teams.']
        },
        {
          title: 'Marketing & Communications Lead',
          level: 'Team Leader',
          description: 'Lead the studio’s brand, content, communications, and creative marketing output across every audience and channel.',
          requirements: ['Proven leadership in brand or marketing communications.', 'Excellent editorial judgment, planning, creative direction, and analytics.', 'Ability to coordinate leadership, project teams, and external partners.'],
          responsibilities: ['Set brand strategy, campaigns, editorial priorities, and standards.', 'Lead marketing, graphic design, video, PR, and award submissions.', 'Plan resources and measure the quality and impact of studio communications.']
        }
      ]
    },
    {
      name: 'People & Operations',
      slug: 'people-operations',
      scope: 'People / Culture / Studio Operations',
      roles: [
        {
          title: 'HR & People Coordinator',
          level: 'Specialist',
          description: 'Support a clear, respectful employee experience across recruitment, onboarding, records, policies, development, and day-to-day people matters.',
          requirements: ['Background in Human Resources, Business, or a related field.', 'Strong discretion, organisation, communication, and follow-through.', 'Working knowledge of Egyptian employment practices and HR systems.'],
          responsibilities: ['Coordinate recruitment, onboarding, records, leave, and documentation.', 'Support policies, engagement, training, and employee communication.', 'Maintain accurate, confidential people data and processes.']
        },
        {
          title: 'Operations Coordinator',
          level: 'Specialist',
          description: 'Keep the studio running smoothly by coordinating facilities, suppliers, schedules, resources, travel, and the practical needs of growing teams.',
          requirements: ['Relevant operations, administration, or office coordination experience.', 'Excellent organisation, prioritisation, and supplier communication.', 'Calm, proactive problem-solving across multiple requests.'],
          responsibilities: ['Coordinate offices, suppliers, equipment, travel, and logistics.', 'Maintain operational records, schedules, and recurring processes.', 'Identify practical improvements that help teams work effectively.']
        },
        {
          title: 'People & Operations Manager',
          level: 'Team Leader',
          description: 'Lead the people and operational systems that support a healthy, accountable, and well-organised multidisciplinary studio.',
          requirements: ['Proven HR and operations leadership in a growing organisation.', 'Strong knowledge of policy, performance, workforce planning, and compliance.', 'Excellent judgment, confidentiality, coaching, and change management.'],
          responsibilities: ['Set people strategy, policies, workforce plans, and operations standards.', 'Lead recruitment, performance, development, culture, and employee relations.', 'Partner with leadership on organisational needs, capacity, and studio growth.']
        }
      ]
    }
  ];

  function escapeMarkup(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[character]);
  }

  function slugify(value) {
    return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function renderList(items) {
    return `<ul>${items.map((item) => `<li>${escapeMarkup(item)}</li>`).join('')}</ul>`;
  }

  container.innerHTML = departments.map((department, departmentIndex) => {
    const departmentNumber = String(departmentIndex + 1).padStart(2, '0');
    const headingId = `department-${department.slug}`;

    const roles = department.roles.map((role, roleIndex) => {
      const roleNumber = `${departmentNumber}.${roleIndex + 1}`;
      const roleSlug = `${department.slug}-${slugify(role.title)}`;
      const triggerId = `trigger-${roleSlug}`;
      const panelId = `panel-${roleSlug}`;

      return `
        <article class="role-item">
          <h4>
            <button class="role-trigger" type="button" aria-expanded="false" aria-controls="${panelId}" id="${triggerId}">
              <span class="role-index">${roleNumber}</span>
              <span class="role-title">${escapeMarkup(role.title)}</span>
              <span class="role-level">${escapeMarkup(role.level)}</span>
              <span class="role-toggle" aria-hidden="true"><i></i><i></i></span>
            </button>
          </h4>
          <div class="role-panel" id="${panelId}" role="region" aria-labelledby="${triggerId}" aria-hidden="true">
            <div class="role-panel-inner">
              <div class="role-detail role-description">
                <p class="role-detail-label">Role description</p>
                <p>${escapeMarkup(role.description)}</p>
              </div>
              <div class="role-detail">
                <p class="role-detail-label">Requirements</p>
                ${renderList(role.requirements)}
              </div>
              <div class="role-detail">
                <p class="role-detail-label">Responsibilities</p>
                ${renderList(role.responsibilities)}
              </div>
            </div>
          </div>
        </article>`;
    }).join('');

    return `
      <section class="department-group" aria-labelledby="${headingId}">
        <header class="department-header">
          <span class="department-number">${departmentNumber}</span>
          <div>
            <h3 id="${headingId}">${escapeMarkup(department.name)}</h3>
            <p>${escapeMarkup(department.scope)}</p>
          </div>
        </header>
        <div class="department-roles">${roles}</div>
      </section>`;
  }).join('');

  const triggers = Array.from(container.querySelectorAll('.role-trigger'));

  function setRole(trigger, shouldOpen) {
    const item = trigger.closest('.role-item');
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!item || !panel) return;

    item.classList.toggle('is-open', shouldOpen);
    trigger.setAttribute('aria-expanded', String(shouldOpen));
    panel.setAttribute('aria-hidden', String(!shouldOpen));
    panel.inert = !shouldOpen;
  }

  function refreshScrollMeasurements() {
    window.setTimeout(() => window.ScrollTrigger?.refresh(), 650);
  }

  triggers.forEach((trigger, index) => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (panel) panel.inert = true;

    trigger.addEventListener('click', () => {
      const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
      triggers.forEach((otherTrigger) => setRole(otherTrigger, otherTrigger === trigger && willOpen));
      refreshScrollMeasurements();
    });

    trigger.addEventListener('keydown', (event) => {
      let nextIndex = null;
      if (event.key === 'ArrowDown') nextIndex = (index + 1) % triggers.length;
      if (event.key === 'ArrowUp') nextIndex = (index - 1 + triggers.length) % triggers.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = triggers.length - 1;

      if (nextIndex !== null) {
        event.preventDefault();
        triggers[nextIndex].focus();
      }

      if (event.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        setRole(trigger, false);
        refreshScrollMeasurements();
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', DS.initCareersRoles);
