window.COURSES = window.COURSES || {};
COURSES.web = {
  id: `web`,
  name: `Web Programming`,
  short: `Web`,
  code: `CS206`,
  by: `Prof. Mohamed Abd-Alfattah`,
  lectures: [
    /* ───────────────────────── LECTURE 1 ───────────────────────── */
    {
      n: 1, title: `Introduction to the Internet and the Web`,
      notes: [
        { h: `Internet, the Web, web pages and web sites`, pts: [
          `The <b>Internet</b> is a collection of computers around the world connected to each other via a high speed series of networks. It is the <b>global system of interconnected computer networks</b> and the main method of exchanging cultures and transferring knowledge.`,
          `The Internet carries an unlimited range of information resources and services: the inter-linked hypertext documents and applications of the Web, <b>electronic mail, telephony and file sharing</b>.`,
          `<b>The Internet is not the World Wide Web</b> (WWW or W3). The Web is just <b>one of the services</b> the Internet offers, although it is the most commonly used one.`,
          `<b>Internet advantages</b> (figure): Social networking, Education and technology, Entertainment, Online services.`,
          `<b>Internet disadvantages</b> (figure): Threat to personal information, Spamming, Cyber crime, Virus attacks.`,
          `The Web was developed to be a <b>pool of human knowledge and human culture</b>, letting collaborators in remote sites share ideas and all aspects of a common project.`,
          `The Web is a vast assortment of files written in some form of <b>HTML</b>, which tells browsers how to display the information. The computers that store the files are called <b>servers</b> because they can serve requests from many users at the same time. Users access the files via applications called <b>browsers</b>.`,
          `<b>Web page</b>: a space of information on the Internet that presents information about a particular person, business, organization or cause. The Web consists of files called web pages (documents) containing <b>links</b> to resources (text, images, audio, video, other data).`,
          `<b>Web site</b>: a collection of web pages grouped together and usually connected together in various ways.`,
          `<b>Static website</b>: web pages are stored on the server <b>in the same form</b> as the user will view them.`,
          `<b>Dynamic website</b>: pages are <b>not</b> stored in the form the user sees; content changes automatically and/or frequently based on criteria. Two meanings: (1) the page code is <b>constructed dynamically, piece by piece</b>; (2) the <b>content displayed varies</b> based on criteria (pre-defined rules or variable user input).`
        ]},
        { h: `URL (Uniform Resource Locator)`, pts: [
          `The URL is the <b>complete address</b> of a web page. It has <b>three components</b>: the <b>protocol</b>, the <b>site (domain/host) name</b>, and the <b>absolute path</b> to the document.`,
          `<b>Protocol</b> (<code>http://</code>): tells the server to use the Hypertext Transfer Protocol ("web mode").`,
          `<b>Domain name / host name</b>: the server address, e.g. <code>www.example.com</code>; <code>example.com</code> is the domain and <code>www.</code> is the particular host at that domain (there could also be <code>development.example.com</code>, <code>clients.example.com</code>).`,
          `<b>File name / path</b> (optional): e.g. <code>/2012/samples/first.html</code>, directories separated by slashes starting from the root directory of the host.`,
          `Example <code>http://www.icci.org/studies/ips.html</code>: protocol = http; host computer name = www; second-level domain = icci; top-level domain = org; directory = studies; file name = ips.html.`
        ]},
        { h: `Top-level domains`, table: [
          [`TLD`, `Meaning`],
          [`com`, `Commercial enterprise`],
          [`edu`, `Educational institution`],
          [`gov`, `Government entity`],
          [`mil`, `Military entity`],
          [`net`, `Provider access network`],
          [`org`, `Organizations (usually nonprofit)`],
          [`biz`, `Businesses`],
          [`pro`, `Professionals such as doctors and attorneys`]
        ]},
        { h: `Web hosting, search engines, protocols, ISP`, pts: [
          `<b>Web hosting</b>: after creating a site it must be stored where it is always available; hosting companies own web servers able to store content.`,
          `<b>Search engine</b>: collects information from websites, analyzes and stores it in a <b>database organized by an index</b>; a query is matched against that database. You search the <b>search engine's database, not the entire Internet</b>, so different engines give different results.`,
          `<b>TCP/IP</b>: the main protocol for Internet communication; defines the rules computers follow to communicate over a network.`,
          `<b>HTTP</b> (Hypertext Transfer Protocol): ensures the exchange of almost all types of resources on the web (files, pages, images, search results); the browser's language to send requests to the server. <b>HTTPS</b> is the secure, encrypted version.`,
          `<b>FTP</b> (File Transfer Protocol): uploads or downloads files between client and server or between two computers; responsible for file transfer.`,
          `<b>ISP</b> (Internet Service Provider): an organization that provides individuals and companies access to the Internet and related services such as e-mail.`
        ]},
        { h: `Client-server architecture`, pts: [
          `Computers on the Internet use <b>client/server architecture</b>: the remote server machine provides files and services to the user's local client machine.`,
          `<b>Web server</b>: a computer that runs special serving software which "serves" HTML pages and associated files when requested by a client (usually a browser). It is secured so only authorized people can change data.`,
          `<b>Server-side technologies</b>: JSP (Java Server Pages), ASP (Active Server Pages), ASP.NET, PHP, Python.`,
          `<b>Client</b> (front end): the user side, typically the web browser; may also mean plug-ins/helper apps or a handheld device.`,
          `<b>Client-side technologies</b>: HTML / XHTML, CSS (Cascading Style Sheets), JavaScript / VBScript.`,
          `<b>Web browser</b>: software for retrieving, displaying and traversing information resources on the WWW. A resource is identified by a <b>URI</b> (Uniform Resource Identifier).`
        ]},
        { h: `How the Web works (5 steps)`, pts: [
          `<b>1.</b> The user enters the URL (e.g. <code>http://www.tutorialspoint.com</code>) in the browser's address bar.`,
          `<b>2.</b> The browser asks the <b>Domain Name Server (DNS)</b> for the IP address of the domain.`,
          `<b>3.</b> After receiving the IP address, the browser sends a request for the page to the web server using <b>HTTP</b>, which specifies how browser and server communicate. (An IP address is an identifying number associated with a specific computer or network.)`,
          `<b>4.</b> The web server receives the request and searches for the page. If found, it returns it to the browser and <b>closes the HTTP connection</b>.`,
          `<b>5.</b> The browser receives the page, <b>interprets</b> it and displays its contents in the window.`
        ]},
        { h: `Site structure, hyperlinks and how browsers display pages`, pts: [
          `Recommended site structure: (1) a <b>root folder</b> containing the site; (2) a page named <b>index.htm / index.html</b> in the root as the default homepage; (3) maybe an <b>images</b> folder; (4) additional folders to organize content.`,
          `<b>Hyperlinks</b> are the primary method to navigate between pages and sites. Four types: <b>Text</b> hyperlink (word or phrase), <b>Image</b> hyperlink, <b>Bookmark</b> hyperlink (to another part of the same page), <b>E-mail</b> hyperlink (send e-mail to the displayed address).`,
          `When a page opens, the browser reads and interprets the HTML file and formats it. External files (images, multimedia) are downloaded from the server; HTML files only contain <b>references</b> to external files, they do not "embed" them.`
        ]},
        { h: `Types of web sites`, table: [
          [`Type`, `Description`],
          [`Blog (Web Log)`, `Online diaries, may include discussion forums`],
          [`Social networking site`, `Users communicate and share media (pictures, videos, music, blogs); may include games and web apps`],
          [`Wiki site`, `Users collaboratively edit (Wikipedia, WikiHow)`],
          [`Web portal`, `Starting point or gateway to other resources on the Internet`],
          [`Search engine site`, `General information, gateway or lookup for other sites (Google, Yahoo, Bing)`],
          [`Education site`, `Teachers, students or administrators post information about events at the school`]
        ]},
        { h: `Website design issues (6)`, pts: [
          `<b>1. Information availability</b>: all information that helps a visitor make informed decisions; benchmark = provide <b>80-90%</b> of what the visitor is looking for.`,
          `<b>2. Page layout</b>: people should find relevant content quickly, else they lose interest; keep pages simple.`,
          `<b>3. Colors</b>: use standard colors; links <b>blue</b>, visited links <b>violet</b>, active links <b>red</b>.`,
          `<b>4. Web accessibility</b>: accessible to all, including people with disabilities (visual, audio, physical, speech).`,
          `<b>5. User-friendly site</b>: built on what the audience requires (UI/UX).`,
          `<b>6. Download speed</b>: cannot be determined by the designer; optimize graphics (images not larger than <b>10 KB</b>), make smaller pages, avoid nested tables.`
        ]},
        { h: `Website security`, pts: [
          `Cyber crime hacks websites to install malware on visitors' computers, steal customer data (credit cards), and propagate illegal content.`,
          `<b>Internet security protocols</b>: <b>IPSec</b> (Internet Security Protocol) and <b>SSL</b> (Secure Socket Layer).`,
          `<b>Threats</b>: mobile worms, malware, PC and mobile ransomware, large scale attacks like <b>Stuxnet</b>, hacking as a service, spam, phishing.`,
          `<b>Email phishing</b>: emails claiming to be from a legitimate enterprise to steal usernames, passwords, credit card details; links lead to fake look-alike sites. Symptoms: <b>spelling and bad grammar</b>, <b>suspicious links</b>, <b>threats</b> ("your account will be closed"), <b>spoofing popular websites or companies</b>.`,
          `<b>Security considerations</b>: (1) <b>Updated software</b>; (2) <b>SQL injection</b> (hackers insert rogue code into your query to change tables, get information or delete data); (3) <b>XSS</b> cross site scripting (attackers inject client side script; check, encode or strip HTML from submitted data); (4) <b>Error messages</b> (do not reveal whether username or password was wrong); (5) <b>Validation of data</b> on both server side and client side; (6) <b>Passwords</b> (minimum 8 characters with upper, lower and special characters); (7) <b>Upload files</b> (may contain a script); (8) <b>SSL</b> when passing personal information.`
        ]}
      ],
      cards: [
        [`Internet vs WWW`, `The Internet is the global network of networks; the Web is only one service on it (the most used).`],
        [`Web page`, `A space of information on the Internet presenting information about a person, business, organization or cause.`],
        [`Web site`, `A collection of web pages grouped together and usually connected in various ways.`],
        [`Static website`, `Pages stored on the server in the same form the user views them.`],
        [`Dynamic website`, `Pages not stored in final form; content built piece by piece or varies by criteria/user input.`],
        [`Three parts of a URL`, `Protocol, site (domain) name, absolute path to the document.`],
        [`In http://www.icci.org/studies/ips.html, what is "icci"?`, `The second-level domain name (org is the top-level domain, www the host name).`],
        [`.edu / .mil / .pro`, `Educational institution / military entity / professionals (doctors, attorneys).`],
        [`TCP/IP`, `Main Internet protocol: rules computers follow to communicate over a network.`],
        [`HTTP vs HTTPS`, `HTTP exchanges web resources (browser's request language); HTTPS is the secure encrypted version.`],
        [`FTP`, `File Transfer Protocol: upload/download files between client and server.`],
        [`ISP`, `Organization providing Internet access and related services like e-mail.`],
        [`Client-side technologies`, `HTML/XHTML, CSS, JavaScript/VBScript.`],
        [`Server-side technologies`, `JSP, ASP, ASP.NET, PHP, Python.`],
        [`Step 2 of how the web works`, `Browser asks the DNS for the IP address of the domain.`],
        [`Four hyperlink types`, `Text, image, bookmark, e-mail.`],
        [`Standard link colors`, `Blue = link, violet = visited, red = active.`],
        [`Information availability benchmark`, `A good site provides 80-90% of what the visitor is looking for.`],
        [`SQL injection`, `Inserting rogue code into a query to manipulate the database (change tables, get info, delete data).`],
        [`XSS`, `Cross Site Scripting: attackers inject client-side script into pages; check/encode/strip HTML from form data.`]
      ],
      qa: [
        [`"The Web works on a client-server approach." Mention the steps that explain how the web works.`, `1) The user enters the URL of the page in the browser's address bar. 2) The browser requests the IP address of the domain from the Domain Name Server (DNS). 3) After receiving the IP address, the browser sends the request for the page to the web server using HTTP, which specifies how browser and server communicate. 4) The web server receives the request and searches for the page; if found it returns it to the browser and closes the HTTP connection. 5) The browser receives the page, interprets it and displays its contents in the browser window.`],
        [`Explain the different design issues at the time of designing an effective website.`, `1) <b>Information availability</b>: provide all information that helps visitors decide; a good site gives 80-90% of what visitors look for. 2) <b>Page layout</b>: content laid out so relevant content is found quickly; keep it simple. 3) <b>Colors</b>: use standard colors (blue links, violet visited, red active) so visitors are not confused. 4) <b>Web accessibility</b>: usable by everyone including people with visual, audio, physical or speech disabilities. 5) <b>User-friendly site</b>: designed around what the audience requires (UI/UX). 6) <b>Download speed</b>: optimize graphics (images not larger than 10 KB), make smaller pages and avoid nested tables.`],
        [`Mention and explain the types of web sites and the Internet protocols.`, `<b>Types</b>: Blog (online diaries, forums); Social networking site (communicate and share media); Wiki site (collaboratively edited, e.g. Wikipedia); Web portal (gateway to other resources); Search engine site (lookup for other sites, e.g. Google); Education site (school news and information).<br><b>Protocols</b>: TCP/IP (main protocol, rules for computers to communicate over a network); HTTP (exchange of web resources, the browser's request language; HTTPS is the encrypted version); FTP (upload/download files between client and server); and ISP is the organization providing Internet access and services such as e-mail.`],
        [`Mention and explain the types of hyperlinks and illustrate the difference between a web page and a web site.`, `Hyperlinks are the primary method to navigate between pages and sites. <b>Text hyperlink</b>: a word or phrase takes visitors to another page/file. <b>Image hyperlink</b>: an image does the same. <b>Bookmark hyperlink</b>: text or image takes visitors to another part of the same page. <b>E-mail hyperlink</b>: lets visitors send an e-mail to the displayed address.<br>A <b>web page</b> is a single document (a space of information about a person, business or cause) containing links to resources; a <b>web site</b> is a collection of related web pages grouped and connected together, usually under one domain with an index.html home page.`],
        [`Define: SQL injection, dynamic website, URL, HTTP.`, `<b>SQL injection</b>: an attempt by hackers to manipulate your database by inserting rogue code into your query to change tables, get information or delete data. <b>Dynamic website</b>: a site whose pages are not stored in the form the user views them; content is constructed piece by piece or varies by pre-defined rules or user input. <b>URL</b>: the complete address of a web page made of protocol, domain name and absolute path. <b>HTTP</b>: network protocol ensuring the exchange of almost all web resources; the browser's language to send requests to the server (HTTPS is the secure version).`],
        [`Discuss website security: threats, phishing symptoms and security considerations.`, `Threats: mobile worms, malware, PC and mobile ransomware, large-scale attacks like Stuxnet, hacking as a service, spam and phishing. Email phishing sends emails pretending to be a legitimate enterprise to steal credentials; symptoms are bad spelling/grammar, suspicious links, threats, and spoofed company graphics. Security considerations: keep software updated; prevent SQL injection; prevent XSS by checking/encoding/stripping HTML; limit information in error messages; validate data on both client and server; enforce strong passwords (8+ chars, upper, lower, special); check uploaded files; use SSL for personal information. Protocols: IPSec and SSL.`]
      ],
      quiz: [
        { q: `What is the purpose of a SQL injection attack?`, o: [
          [`Improving website aesthetics`, `SQL injection is an attack, not a design improvement.`],
          [`Injecting malicious scripts into web pages`, `That describes Cross Site Scripting (XSS), which injects client-side script.`],
          [`Gaining unauthorized access to a database by manipulating SQL queries`, `Correct. Hackers insert rogue code into a query to change tables, get information or delete data (L1 security considerations).`],
          [`Enhancing server performance`, `An attack does not improve performance.`]
        ], a: 2, src: `Exam 2025/26` },
        { q: `What is the purpose of encrypting data in transit?`, o: [
          [`Improving website aesthetics`, `Encryption has nothing to do with appearance.`],
          [`Optimizing server processing speed`, `Encryption adds work; it does not speed up processing.`],
          [`Protecting data from interception during transmission`, `Correct. This is why the lecture recommends SSL/HTTPS when passing personal information.`],
          [`Enhancing user interfaces`, `Encryption is invisible to the user interface.`]
        ], a: 2, src: `Exam 2025/26` },
        { q: `URL is ___________`, o: [
          [`user's address`, `A URL addresses a resource, not a user.`],
          [`an attribute`, `href and src are attributes that hold URLs, but a URL itself is an address.`],
          [`source code`, `The URL points to the document; it is not the code.`],
          [`web address`, `Correct. The URL is the complete address of a web page.`]
        ], a: 3, src: `Sheet 1 (2025/26)` },
        { q: `Which of the following is used to read an HTML page and render it?`, o: [
          [`Web server`, `The server stores and sends the page; it does not render it.`],
          [`Web network`, `Not a real component that renders pages.`],
          [`Web browser`, `Correct. The browser interprets the HTML and displays it (step 5 of how the web works).`],
          [`Web matrix`, `Not the component that renders pages.`]
        ], a: 2, src: `Sheet 1 (2025/26)` },
        { q: `What is the correct general syntax of a web address?`, o: [
          [`port://domain.filename:path/scheme/prefix`, `The parts are in the wrong order.`],
          [`prefix://scheme.port:domain/filename/path`, `The scheme (protocol) must come first.`],
          [`path://prefix.port:domain/filename/scheme`, `The path comes after the domain, not first.`],
          [`scheme://prefix.domain:port/path/filename`, `Correct. Protocol first, then host prefix and domain, optional port, then path and file name.`]
        ], a: 3, src: `Sheet 1 (2025/26)` },
        { q: `A 404 HTTP error is generated due to ____________`, o: [
          [`removing the newline character`, `Formatting characters do not cause a 404.`],
          [`a missing JavaScript file only`, `Too narrow: any missing resource gives 404.`],
          [`any missing file`, `Correct. 404 Not Found means the server could not find the requested resource.`],
          [`slow loading of the web page`, `Slowness gives timeouts, not 404.`]
        ], a: 2, src: `Sheet 1 (2025/26)` },
        { q: `In <code>http://www.icci.org/studies/ips.html</code>, "org" is the:`, o: [
          [`Host computer name`, `The host name is "www".`],
          [`Second-level domain name`, `That is "icci".`],
          [`Top-level domain name`, `Correct. "org" (organizations, usually nonprofit) is the top-level domain.`],
          [`Directory name`, `The directory is "studies".`]
        ], a: 2 },
        { q: `When you use a search engine, you search:`, o: [
          [`The entire Internet in real time`, `The lecture stresses that you do NOT search the entire Internet.`],
          [`The search engine's indexed database`, `Correct. Results come from the engine's database organized by an index, which is why different engines give different results.`],
          [`Only the web hosting company's servers`, `Hosting stores sites; it is not what a search engine queries.`],
          [`The DNS server`, `DNS translates domain names to IP addresses.`]
        ], a: 1 },
        { q: `Which protocol is responsible for uploading and downloading files between client and server?`, o: [
          [`HTTP`, `HTTP exchanges web resources such as pages; the lecture assigns file transfer to FTP.`],
          [`FTP`, `Correct. File Transfer Protocol loads (uploads) or retrieves (downloads) files.`],
          [`TCP/IP`, `TCP/IP is the general communication protocol of the Internet.`],
          [`SSL`, `SSL is for secure (encrypted) communication.`]
        ], a: 1 },
        { q: `Which of the following is a server-side technology?`, o: [
          [`CSS`, `CSS is client-side (presentation).`],
          [`JavaScript`, `In this course JavaScript is listed as client-side scripting.`],
          [`PHP`, `Correct. PHP, JSP, ASP, ASP.NET and Python are server-side.`],
          [`XHTML`, `XHTML is client-side markup.`]
        ], a: 2 },
        { q: `According to the design issue "Colors", visited links should be shown in:`, o: [
          [`Blue`, `Blue is for unvisited links.`],
          [`Violet`, `Correct. Blue for links, violet for visited links, red for active links.`],
          [`Red`, `Red is for active links.`],
          [`Green`, `Not a standard link color.`]
        ], a: 1 },
        { q: `A login error message should:`, o: [
          [`Tell the user exactly which field (username or password) is wrong`, `That leaks information to attackers.`],
          [`Not reveal which field is incorrect`, `Correct. "Error messages" consideration: be careful how much information you give.`],
          [`Show the database query that failed`, `That helps attackers perform SQL injection.`],
          [`Never be shown`, `The user still needs to know the login failed.`]
        ], a: 1 },
        { q: `A web site whose page content changes based on user input is:`, o: [
          [`A static website`, `Static pages are stored in the same form the user views them.`],
          [`A dynamic website`, `Correct. Content varies based on pre-defined rules or variable user input.`],
          [`A web portal`, `A portal is a site type (gateway), not a static/dynamic category.`],
          [`A web host`, `A host stores sites.`]
        ], a: 1 }
      ]
    },
    /* ───────────────────────── LECTURE 2 ───────────────────────── */
    {
      n: 2, title: `HTML (I): Document Structure, Tags and Attributes`,
      notes: [
        { h: `What is HTML?`, pts: [
          `<b>HTML</b> (Hyper Text Markup Language) is the language used to create web pages. With HTML you can create a page with <b>text, graphics, sound and video</b>. It is a <b>markup</b> language (not a programming or scripting language) and describes the <b>structure</b> of a page.`,
          `Pages end with <b>.htm</b> or <b>.html</b>. They can be written in professional HTML editors, but for learning a simple text editor like <b>Notepad</b> (PC) or <b>TextEdit</b> (Mac) is recommended. An <b>HTML editor</b> is a word processor specialized to make writing HTML easier.`,
          `The purpose of a <b>web browser</b> (Chrome, Edge, Firefox, Safari) is to read HTML documents and display them correctly. The browser <b>does not display the tags</b>; it uses them to decide how to display the document.`,
          `Lab 1: web developers are <b>front end</b>, <b>back end</b> or <b>full stack</b>. Front-end tools: a code editor (VS Code) and a browser (Chrome).`
        ]},
        { h: `A simple HTML document`, code: `<!DOCTYPE html>          <!-- declares an HTML5 document -->
<html>                   <!-- beginning of the html document -->
<head>                   <!-- meta information about the page -->
  <title>Page Title</title>   <!-- title shown in the browser tab -->
</head>
<body>                   <!-- the visible page content -->
  <h1>My First Heading</h1>   <!-- a large heading -->
  <p>My first paragraph.</p>  <!-- a paragraph -->
</body>
</html>` },
        { h: `Elements, tags and nesting`, pts: [
          `An <b>HTML element</b> is defined by a start tag, some content, and an end tag: <code>&lt;tagname&gt;Content&lt;/tagname&gt;</code>. The element is everything from the start tag to the end tag.`,
          `<b>Empty elements</b> have no content and no end tag, e.g. <code>&lt;br&gt;</code>, <code>&lt;hr&gt;</code>, <code>&lt;img&gt;</code>.`,
          `A <b>tag</b> is a keyword enclosed by angle brackets, e.g. <code>&lt;I&gt;</code>. Many (not all) tags come in pairs; the closing tag is the same command with an additional forward slash <b>/</b>. <code>&lt;B&gt;Warning&lt;/B&gt;</code> shows "Warning" in bold.`,
          `<b>Nested tags</b>: whenever tags are inside other tags you must <b>close the nearest tag first</b>: <code>&lt;H1&gt;&lt;I&gt;The Nation&lt;/I&gt;&lt;/H1&gt;</code>.`,
          `All web pages share a common structure and should contain the pair tags <code>&lt;HTML&gt;</code>, <code>&lt;HEAD&gt;</code>, <code>&lt;TITLE&gt;</code> and <code>&lt;BODY&gt;</code>.`,
          `<b>Never skip the end tag</b>: some elements (like <code>&lt;p&gt;</code>) display correctly without it, but you should not rely on that.`,
          `<b>HTML is not case sensitive</b>: <code>&lt;P&gt;</code> means the same as <code>&lt;p&gt;</code> (W3C recommends lowercase, and XHTML requires it).`
        ]},
        { h: `Document rules: DOCTYPE, html, head, title, body`, pts: [
          `All HTML documents must start with a document type declaration <code>&lt;!DOCTYPE html&gt;</code>. It represents the document type and helps browsers display pages correctly. It must appear <b>only once, at the top</b> (before any HTML tags) and is <b>not case sensitive</b>. The HTML5 declaration is <code>&lt;!DOCTYPE html&gt;</code>.`,
          `The document begins with <code>&lt;html&gt;</code> and ends with <code>&lt;/html&gt;</code> (the first tag after the DOCTYPE).`,
          `The <b>visible part</b> of the document is between <code>&lt;body&gt;</code> and <code>&lt;/body&gt;</code>. Metadata lives in <code>&lt;head&gt;</code> (title, meta, link, style, script), never visible content like tables.`,
          `<b>&lt;title&gt;</b>: choose carefully; the title determines the page's <b>ranking in certain search engines</b> and appears in Favorites, History and Bookmark lists.`
        ]},
        { h: `Headings, paragraphs, links`, pts: [
          `Headings are <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>. <code>&lt;h1&gt;</code> is the <b>most important (largest)</b>, <code>&lt;h6&gt;</code> the least important.`,
          `Paragraphs use <code>&lt;p&gt;</code>.`,
          `Links use the <code>&lt;a&gt;</code> (anchor) tag; the <b>href</b> attribute gives the destination: <code>&lt;a href="https://www.google.com"&gt;This is a link&lt;/a&gt;</code>.`,
          `<b>target="_blank"</b> opens the link in a new window/tab (<code>_self</code> = same frame, the default; <code>_parent</code>, <code>_top</code> are other values). An image link is <code>&lt;a href="url"&gt;&lt;img src="logo.png"&gt;&lt;/a&gt;</code>.`,
          `<b>View source</b>: right-click then "View Page Source" (Chrome) or "View Source" (Edge). "Inspect" shows the HTML and CSS of an element and lets you edit them on the fly.`
        ]},
        { h: `Attributes`, pts: [
          `All HTML elements can have attributes. They provide <b>additional information</b>, are <b>always specified in the start tag</b>, and usually come in <b>name/value pairs</b> like <code>name="value"</code>.`,
          `<b>href</b>: URL of the page a link goes to (on <code>&lt;a&gt;</code>).`,
          `<b>src</b>: path of the image to display on <code>&lt;img&gt;</code>: <code>&lt;img src="img_girl.jpg" width="500" height="600"&gt;</code>.`,
          `<b>width / height</b>: size of the image in pixels.`,
          `<b>alt</b>: the <b>required</b> alternate text for an image if it cannot be displayed (slow connection or error in src): <code>&lt;img src="img_girl.jpg" alt="Girl with a jacket"&gt;</code>.`,
          `<b>style</b>: adds styles such as color, font, size: <code>&lt;p style="color:red;"&gt;</code>.`,
          `<b>lang</b>: declare the language in <code>&lt;html lang="en"&gt;</code> to assist search engines and browsers. <code>lang="en-US"</code>: first two characters = language, last two = country.`,
          `<b>title</b>: extra information shown as a <b>tooltip</b> when the mouse is over the element.`
        ]},
        { h: `Absolute vs relative URLs (src / href)`, table: [
          [`Kind`, `Example`, `Meaning`],
          [`Absolute URL`, `src="https://www.google.com/images/img_girl.jpg"`, `Links to an external image hosted on another website (might be under copyright)`],
          [`Relative, no leading slash`, `src="img_girl.jpg"`, `Relative to the current page (same folder)`],
          [`Relative, leading slash`, `src="/images/img_girl.jpg"`, `Relative to the domain (root of the site)`],
          [`Use`, `Relative URLs`, `Link other pages within the same site`]
        ]}
      ],
      cards: [
        [`HTML stands for`, `Hyper Text Markup Language.`],
        [`HTML is what type of language?`, `A markup language.`],
        [`HTML element`, `Start tag + content + end tag.`],
        [`Empty element`, `An element with no content and no end tag, e.g. &lt;br&gt;.`],
        [`Character that marks an end tag`, `The forward slash / (as in &lt;/p&gt;).`],
        [`Rule for nested tags`, `Close the nearest (innermost) tag first.`],
        [`HTML5 doctype`, `&lt;!DOCTYPE html&gt; (once, at the top, not case sensitive).`],
        [`First tag of an HTML document`, `&lt;html&gt; (after the DOCTYPE declaration).`],
        [`Visible part of the document`, `Inside &lt;body&gt;.`],
        [`Why choose the title carefully?`, `It affects search-engine ranking and appears in favorites, history and bookmarks.`],
        [`Largest heading`, `&lt;h1&gt; (h6 is the smallest).`],
        [`Attribute for link destination`, `href.`],
        [`Attribute for image path`, `src.`],
        [`Attribute for alternate image text`, `alt (required on &lt;img&gt;).`],
        [`title attribute`, `Extra information displayed as a tooltip.`],
        [`lang="en-US"`, `English language, United States country.`],
        [`Relative URL starting with /`, `Relative to the domain root.`],
        [`Open link in new tab`, `target="_blank".`],
        [`Is HTML case sensitive?`, `No (but XHTML requires lowercase).`]
      ],
      qa: [
        [`Describe the basic structure of an HTML5 document and the role of each part.`, `<code>&lt;!DOCTYPE html&gt;</code> declares an HTML5 document (once, at the top). <code>&lt;html&gt;</code> is the root that wraps the document (optionally <code>lang="en"</code>). <code>&lt;head&gt;</code> holds meta information: <code>&lt;title&gt;</code> (tab title, search ranking, bookmarks), <code>&lt;meta charset&gt;</code>, links to CSS. <code>&lt;body&gt;</code> holds the visible content such as <code>&lt;h1&gt;</code> headings and <code>&lt;p&gt;</code> paragraphs. Elements must be nested correctly (close the nearest tag first).`],
        [`What are HTML attributes? Explain href, src, alt, width/height, style, lang and title with examples.`, `Attributes give additional information about elements, are always written in the start tag as name="value". <b>href</b>: link URL, <code>&lt;a href="https://www.google.com"&gt;</code>. <b>src</b>: image path, <code>&lt;img src="img_girl.jpg"&gt;</code>. <b>alt</b>: required alternate text if the image cannot be shown. <b>width/height</b>: image size in pixels. <b>style</b>: inline CSS, <code>style="color:red;"</code>. <b>lang</b>: page language in <code>&lt;html lang="en-US"&gt;</code> (language-country). <b>title</b>: tooltip text on mouse over.`],
        [`Explain the difference between absolute and relative URLs.`, `An <b>absolute URL</b> includes the full address with the domain and links to a resource hosted on another site (e.g. <code>https://www.google.com/images/img_girl.jpg</code>; external images may be copyrighted). A <b>relative URL</b> does not include the domain and links within the same site: without a leading slash it is relative to the current page (<code>img_girl.jpg</code>); with a leading slash it is relative to the domain root (<code>/images/img_girl.jpg</code>).`],
        [`Write HTML code for a page with the title "My Page", a level-1 heading, a paragraph with a tooltip, an image with alternate text, and a link that opens Google in a new tab.`, `<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;&lt;title&gt;My Page&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Welcome&lt;/h1&gt;
  &lt;p title="I'm a tooltip"&gt;Hover over me.&lt;/p&gt;
  &lt;img src="img_girl.jpg" alt="Girl with a jacket" width="500" height="600"&gt;
  &lt;a href="https://www.google.com" target="_blank"&gt;Visit Google&lt;/a&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>`]
      ],
      quiz: [
        { q: `What does HTML stand for?`, o: [
          [`Hyper Text Markup Language`, `Correct. HTML is the markup language used to create web pages.`],
          [`Home Tool Markup Language`, `Not the real expansion.`],
          [`Hyperlinks and Text Markup Language`, `Hyperlinks are a feature of HTML, not part of its name.`]
        ], a: 0, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `HTML is what type of language?`, o: [
          [`Scripting Language`, `JavaScript and PHP are scripting languages; HTML only marks up structure.`],
          [`Markup Language`, `Correct. HTML = Hyper Text <b>Markup</b> Language.`],
          [`Programming Language`, `HTML has no logic, variables or loops.`],
          [`Network Protocol`, `HTTP is a protocol; HTML is a language.`]
        ], a: 1, src: `Midterm 2023/24 (Form B)` },
        { q: `Choose the correct HTML element for the largest heading:`, o: [
          [`&lt;head&gt;`, `&lt;head&gt; holds meta information, not a heading.`],
          [`&lt;h1&gt;`, `Correct. &lt;h1&gt; defines the most important (largest) heading.`],
          [`&lt;heading&gt;`, `There is no &lt;heading&gt; element.`],
          [`&lt;h6&gt;`, `&lt;h6&gt; is the least important (smallest) heading.`]
        ], a: 1, src: `Midterm 2023/24 (Form C)` },
        { q: `Which doctype is correct for HTML5?`, o: [
          [`&lt;!DOCTYPE HTML5&gt;`, `There is no version number in the HTML5 doctype.`],
          [`&lt;!DOCTYPE html&gt;`, `Correct. This is the HTML5 declaration (L2).`],
          [`&lt;!DOCTYPE&gt;`, `Incomplete: the document type must be named.`],
          [`None`, `B is correct.`]
        ], a: 1, src: `Exam 2024/25, 2023/24 (May), Midterm 2023/24` },
        { q: `What is the correct HTML for inserting an image?`, o: [
          [`&lt;img alt="MyImage"&gt;image.gif&lt;/img&gt;`, `&lt;img&gt; is an empty element; the file goes in src, not as content.`],
          [`&lt;image src="image.gif" alt="MyImage"&gt;`, `The element is &lt;img&gt;, not &lt;image&gt;.`],
          [`&lt;img src="image.gif" alt="MyImage"&gt;`, `Correct. src gives the path and alt the alternate text.`],
          [`&lt;img href="image.gif" alt="MyImage"&gt;`, `href is for links; images use src.`]
        ], a: 2, src: `Exam 2024/25, 2023/24 (May), Midterm 2023/24` },
        { q: `Relative URLs are used to`, o: [
          [`link other pages within the same site`, `Correct. A relative URL does not include the domain, so it stays within the same site.`],
          [`link the same page with other sites`, `Linking to other sites needs an absolute URL.`],
          [`link other pages with other sites`, `That needs absolute URLs.`],
          [`does not link`, `Relative URLs do link.`]
        ], a: 0, src: `Exam 2024/25, 2023/24, Midterm 2023/24` },
        { q: `The visible part of an HTML document lies in`, o: [
          [`Paragraph tag`, `Paragraphs are only one kind of visible content.`],
          [`Body tag`, `Correct. The visible part is between &lt;body&gt; and &lt;/body&gt;.`],
          [`Links tag`, `Links are inside the body.`],
          [`Image tag`, `Images are inside the body.`]
        ], a: 1, src: `Exam 2023/24, Midterm 2023/24 (Form C)` },
        { q: `The tags in HTML are`, o: [
          [`case-sensitive`, `HTML is not case sensitive (XHTML is).`],
          [`in upper case`, `They may be written in either case.`],
          [`not case sensitive`, `Correct. &lt;P&gt; and &lt;p&gt; mean the same in HTML (L2).`],
          [`in lowercase`, `Lowercase is recommended, not required, in HTML.`]
        ], a: 2, src: `Exam 2023/24` },
        { q: `Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?`, o: [
          [`src`, `src gives the image path.`],
          [`longdesc`, `longdesc pointed to a long description page; it is not the alternate text.`],
          [`alt`, `Correct. alt is the required alternate text attribute.`],
          [`title`, `title shows a tooltip.`]
        ], a: 2, src: `Exam 2025/26` },
        { q: `In HTML, which attribute is used to create a link that opens in a new window tab?`, o: [
          [`src="_blank"`, `src is for embedded resources, not link targets.`],
          [`alt="_blank"`, `alt is alternate text.`],
          [`target="_self"`, `_self opens in the same tab (default).`],
          [`target="_blank"`, `Correct. target="_blank" opens a new window/tab.`]
        ], a: 3, src: `Exam 2025/26` },
        { q: `What is the correct HTML for creating a hyperlink?`, o: [
          [`&lt;a&gt;http://www.google.com&lt;/a&gt;`, `Without href this is not a working link.`],
          [`&lt;a name="http://www.Google.com"&gt;Google.com&lt;/a&gt;`, `name defines a bookmark name, not a destination.`],
          [`&lt;a href="http://www.Google.com"&gt;Google&lt;/a&gt;`, `Correct. href holds the destination URL.`],
          [`&lt;a url="http://www.Google.com"&gt;Google.com&lt;/a&gt;`, `There is no url attribute.`]
        ], a: 2, src: `Midterm 2023/24 (Form B)` },
        { q: `&lt;a&gt; and &lt;/a&gt; are the tags used for`, o: [
          [`Adding image`, `Images use &lt;img&gt;.`],
          [`Aligning text`, `Alignment is done with CSS text-align.`],
          [`Audio-voiced text`, `Audio uses &lt;audio&gt;.`],
          [`Adding links to your page`, `Correct. &lt;a&gt; is the anchor (hyperlink) element.`]
        ], a: 3, src: `Midterm 2023/24 (Form C)` },
        { q: `Which character is used to indicate an end tag?`, o: [
          [`/`, `Correct. The closing tag repeats the name with a forward slash: &lt;/p&gt;.`],
          [`*`, `Not used in tags.`],
          [`&lt;`, `This starts every tag, opening or closing.`],
          [`^`, `Not used in tags.`]
        ], a: 0, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `How can you open a link in a new tab/browser window?`, o: [
          [`&lt;a href="url" target="new"&gt;`, `"new" is not the standard keyword.`],
          [`&lt;a href="url" new&gt;`, `There is no new attribute.`],
          [`&lt;a href="url" target="_blank"&gt;`, `Correct.`]
        ], a: 2, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `Which HTML element defines the title of a document?`, o: [
          [`&lt;head&gt;`, `&lt;head&gt; contains the title but is not the title.`],
          [`&lt;title&gt;`, `Correct. Placed inside &lt;head&gt;.`],
          [`&lt;meta&gt;`, `&lt;meta&gt; gives metadata like charset.`]
        ], a: 1, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `HTML comments start with &lt;!-- and end with --&gt;`, o: [
          [`True`, `Correct. &lt;!-- Write your comments here --&gt; (L3).`],
          [`False`, `This is exactly the HTML comment syntax.`]
        ], a: 0, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `Which tag is the first tag in an HTML document?`, o: [
          [`&lt;head&gt;`, `&lt;head&gt; comes inside &lt;html&gt;.`],
          [`&lt;html&gt;`, `Correct. The document begins with &lt;html&gt; (the DOCTYPE is a declaration, not a tag).`],
          [`&lt;title&gt;`, `It is inside &lt;head&gt;.`],
          [`&lt;body&gt;`, `It comes after &lt;head&gt;.`]
        ], a: 1, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `What tag is used to display a picture in an HTML page?`, o: [
          [`picture`, `&lt;picture&gt; is a wrapper for responsive sources; the basic image tag is img.`],
          [`img`, `Correct.`],
          [`image`, `There is no &lt;image&gt; tag in HTML.`],
          [`src`, `src is an attribute.`]
        ], a: 1, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `Which of the following will NOT be found in the &lt;head&gt; section?`, o: [
          [`&lt;meta&gt; tags`, `Meta tags belong in the head.`],
          [`&lt;table&gt;`, `Correct. A table is visible content and belongs in the body.`],
          [`&lt;title&gt;`, `The title belongs in the head.`],
          [`None of the above`, `B is not found in the head.`]
        ], a: 1, src: `Midterm 2023/24 (Form C)` },
        { q: `How do we write comments in HTML?`, o: [
          [`&lt;/.......&gt;`, `That is a closing tag shape.`],
          [`&lt;!.......&gt;`, `Correct (Sanfoundry's shorthand for &lt;!-- ... --&gt;).`],
          [`&lt;/....../&gt;`, `Not valid.`],
          [`&lt;.......!&gt;`, `Not valid.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `HTML comment should be enclosed between`, o: [
          [`&lt;!- and --&gt;`, `The start needs two dashes.`],
          [`&lt;! and !&gt;`, `Not the comment syntax.`],
          [`&lt;!-- and --&gt;`, `Correct. (Option smudged in the photo; this is the intended answer.)`],
          [`&lt;! -- and --&gt; (with a space)`, `There must be no space between &lt;! and --.`]
        ], a: 2, src: `Exam 2022/23 Summer` },
        { q: `Which of the following extensions is used to save an HTML file?`, o: [
          [`.hl`, `Not an HTML extension.`],
          [`.h`, `C header extension.`],
          [`.htl`, `Not valid.`],
          [`.html`, `Correct. Pages end with .htm or .html.`]
        ], a: 3, src: `Sheet 1 (2025/26)` },
        { q: `In which part of the HTML is metadata contained?`, o: [
          [`head tag`, `Correct. Metadata (title, meta, link, style) goes in &lt;head&gt;.`],
          [`title tag`, `The title is one piece of metadata inside head.`],
          [`html tag`, `Too general.`],
          [`body tag`, `The body holds visible content.`]
        ], a: 0, src: `Sheet 1 (2025/26)` },
        { q: `Who is the father of HTML?`, o: [
          [`Rasmus Lerdorf`, `He created PHP.`],
          [`Tim Berners-Lee`, `Correct. He invented the Web and HTML.`],
          [`Brendan Eich`, `He created JavaScript.`],
          [`Sergey Brin`, `Co-founder of Google.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `HTML is a subset of ___________`, o: [
          [`SGMT`, `Not a real language.`],
          [`SGML`, `Correct. HTML was defined as an application of SGML (Standard Generalized Markup Language).`],
          [`SGME`, `Not a real language.`],
          [`XHTML`, `XHTML came after HTML and is XML-based.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `Which of the following HTML code will make an image clickable?`, o: [
          [`&lt;a href="url"&gt;Home Page&lt;/a&gt;`, `This is a text link only.`],
          [`&lt;img src="logo"&gt;&lt;a href="url"&gt;Home&lt;/a&gt;&lt;/img&gt;`, `&lt;img&gt; is empty and cannot wrap a link.`],
          [`&lt;a href="url"&gt;Home&lt;/a&gt; &lt;img src="logo" /&gt;`, `The image is outside the link.`],
          [`&lt;a href="url"&gt;&lt;img src="logo" /&gt;&lt;/a&gt;`, `Correct. Putting the image inside &lt;a&gt; makes an image hyperlink.`]
        ], a: 3, src: `Sheet 1 (2025/26)` },
        { q: `What is the path for an image located in the same folder as the current page?`, o: [
          [`&lt;img src="pic.jpg"&gt;`, `Correct. No leading slash means relative to the current page.`],
          [`&lt;img src="../pic.jpg"&gt;`, `../ goes one folder up.`],
          [`&lt;img src="images/pic.jpg"&gt;`, `That is in a subfolder "images".`],
          [`&lt;img src="/images/pic.jpg"&gt;`, `Leading slash: relative to the domain root.`]
        ], a: 0, src: `Sheet 1 (2025/26)` },
        { q: `What is the color of an unvisited link (default)?`, o: [
          [`red`, `Red is for active links.`],
          [`blue`, `Correct. Unvisited links are blue (L1 colors design issue).`],
          [`purple`, `Purple/violet is for visited links.`],
          [`green`, `Not a default link color.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `Which one of the following is NOT a value of the target attribute?`, o: [
          [`_blank`, `Valid: new tab.`],
          [`_top`, `Valid: full body of the window.`],
          [`_self`, `Valid: same frame (default).`],
          [`_empty`, `Correct. _empty is not a target keyword.`]
        ], a: 3, src: `Sheet 1 (2025/26)` }
      ]
    },
    /* ───────────────────────── LECTURE 3 ───────────────────────── */
    {
      n: 3, title: `HTML (II): Formatting, Styles and Colors`,
      notes: [
        { h: `Quotes, horizontal rules, line breaks`, pts: [
          `Double quotes around attribute values are most common, but single quotes also work. When the value itself contains double quotes, use single quotes: <code>&lt;p title='John "ShotGun" Nelson'&gt;</code> (or the reverse: <code>title="John 'ShotGun' Nelson"</code>).`,
          `<code>&lt;hr&gt;</code> defines a <b>thematic break</b>, usually displayed as a <b>horizontal rule</b>, to separate content (or define a change). It is an empty element.`,
          `<code>&lt;br&gt;</code> defines a <b>line break</b> (a new line without starting a new paragraph). It is an <b>empty tag</b> with no end tag: <code>&lt;p&gt;This is&lt;br&gt;a paragraph&lt;br&gt;with line breaks.&lt;/p&gt;</code>.`
        ]},
        { h: `The poem problem and &lt;pre&gt;`, pts: [
          `Browsers collapse extra spaces and line breaks inside <code>&lt;p&gt;</code>, so a poem written on several lines shows as one line ("the poem problem").`,
          `<b>Solution</b>: <code>&lt;pre&gt;</code> defines <b>preformatted text</b>, displayed in a <b>fixed-width font (usually Courier)</b>, and it <b>preserves both spaces and line breaks</b>.`
        ]},
        { h: `The style attribute and basic CSS properties`, pts: [
          `Syntax: <code>&lt;tagname style="property:value;"&gt;</code>. The property is a CSS property and the value a CSS value.`,
          `<b>background-color</b>: background color of an element, e.g. <code>&lt;body style="background-color:powderblue;"&gt;</code>.`,
          `<b>color</b>: text color, e.g. <code>&lt;h1 style="color:blue;"&gt;</code>.`,
          `<b>font-family</b>: the font, e.g. <code>style="font-family:verdana;"</code>, <code>courier</code>.`,
          `<b>font-size</b>: text size, e.g. <code>style="font-size:300%;"</code> or <code>50px</code>.`,
          `<b>text-align</b>: horizontal alignment, e.g. <code>style="text-align:center;"</code>.`,
          `<b>border</b>: e.g. <code>style="border:2px solid Tomato;"</code> sets border width, style and color.`
        ]},
        { h: `Text formatting elements`, table: [
          [`Tag`, `Meaning`, `Note`],
          [`&lt;b&gt;`, `Bold text`, `Visual only`],
          [`&lt;strong&gt;`, `Important text`, `Bold with semantic importance`],
          [`&lt;i&gt;`, `Italic text`, `Visual only`],
          [`&lt;em&gt;`, `Emphasized text`, `Italic with semantic emphasis`],
          [`&lt;mark&gt;`, `Marked / highlighted text`, `Do not forget to buy &lt;mark&gt;milk&lt;/mark&gt;`],
          [`&lt;small&gt;`, `Smaller text`, ``],
          [`&lt;del&gt;`, `Deleted text`, `Browsers strike a line through it`],
          [`&lt;ins&gt;`, `Inserted text`, `Browsers usually underline it`],
          [`&lt;sub&gt;`, `Subscript`, `Half a character below the line, e.g. H&lt;sub&gt;2&lt;/sub&gt;O`],
          [`&lt;sup&gt;`, `Superscript`, `Half a character above the line, e.g. footnotes WWW[1], powers x&lt;sup&gt;2&lt;/sup&gt;`],
          [`&lt;u&gt;`, `Underline`, `Listed with B, I, P, BR`]
        ]},
        { h: `Comments`, pts: [
          `HTML comments are not displayed but document the source: <code>&lt;!-- Write your comments here --&gt;</code>.`,
          `Comment syntaxes to remember: HTML <code>&lt;!-- --&gt;</code>; CSS <code>/* */</code>; JavaScript <code>//</code> and <code>/* */</code>; PHP <code>#</code>, <code>//</code>, <code>/* */</code>.`
        ]},
        { h: `Colors`, pts: [
          `Colors are specified with <b>predefined color names</b>, or with <b>RGB, HEX, HSL, RGBA or HSLA</b> values. HTML supports <b>140 standard color names</b> (Tomato, DodgerBlue, MediumSeaGreen, Violet, powderblue...).`,
          `Colors can be applied to <b>background</b> (background-color), <b>text</b> (color) and <b>borders</b> (border:2px solid Violet).`,
          `"Tomato" written 5 ways: <code>rgb(255, 99, 71)</code>, <code>#ff6347</code>, <code>hsl(9, 100%, 64%)</code>; 50% transparent: <code>rgba(255, 99, 71, 0.5)</code>, <code>hsla(9, 100%, 64%, 0.5)</code>. The last value (alpha) is opacity from 0 to 1.`,
          `<b>Shades of gray</b> use <b>equal values</b> for all three RGB parameters, e.g. <code>rgb(60,60,60)</code> ... <code>rgb(240,240,240)</code>. "Gray with level 200" = <code>rgb(200, 200, 200)</code>.`
        ]},
        { h: `Example: inline styles`, code: `<p>I am normal</p>
<p style="color:red;">I am red</p>
<p style="color:blue;">I am blue</p>
<p style="font-size:50px;">I am big</p>
<h1 style="background-color:rgb(255, 99, 71);">rgb(255, 99, 71)</h1>
<h1 style="background-color:#ff6347;">#ff6347</h1>
<h1 style="background-color:hsla(9, 100%, 64%, 0.5);">50% transparent</h1>
<p>Water is H<sub>2</sub>O and E = mc<sup>2</sup></p>
<p>My favorite color is <del>blue</del> <ins>red</ins>.</p>` }
      ],
      cards: [
        [`&lt;hr&gt;`, `Thematic break, shown as a horizontal rule.`],
        [`&lt;br&gt;`, `Line break; empty tag, no end tag.`],
        [`&lt;pre&gt;`, `Preformatted text: fixed-width font, keeps spaces and line breaks.`],
        [`Style attribute syntax`, `&lt;tagname style="property:value;"&gt;`],
        [`Property for text color`, `color.`],
        [`Property for background color`, `background-color.`],
        [`Property for the font`, `font-family.`],
        [`Property for text size`, `font-size.`],
        [`Property for horizontal alignment`, `text-align.`],
        [`Important text`, `&lt;strong&gt;.`],
        [`Emphasized text`, `&lt;em&gt;.`],
        [`Highlighted text`, `&lt;mark&gt;.`],
        [`Deleted / inserted text`, `&lt;del&gt; (strike-through) / &lt;ins&gt; (underlined).`],
        [`Power in an expression`, `&lt;sup&gt; (superscript).`],
        [`Chemical formula H2O`, `&lt;sub&gt; (subscript).`],
        [`Number of standard color names`, `140.`],
        [`Color value formats`, `Names, RGB, HEX, HSL, RGBA, HSLA.`],
        [`Tomato in HEX`, `#ff6347 = rgb(255, 99, 71).`],
        [`Shades of gray`, `Equal R, G and B values, e.g. rgb(200,200,200).`]
      ],
      qa: [
        [`List the HTML text formatting elements and their meaning.`, `&lt;b&gt; bold, &lt;strong&gt; important text, &lt;i&gt; italic, &lt;em&gt; emphasized text, &lt;mark&gt; marked/highlighted, &lt;small&gt; smaller text, &lt;del&gt; deleted text (strike-through), &lt;ins&gt; inserted text (underlined), &lt;sub&gt; subscript (half a character below, e.g. H<sub>2</sub>O), &lt;sup&gt; superscript (half a character above, e.g. powers and footnotes), and &lt;u&gt; underline.`],
        [`What is the "poem problem" and how is it solved?`, `Inside &lt;p&gt; the browser collapses extra spaces and line breaks, so a poem typed on four lines is displayed as one line. The solution is the &lt;pre&gt; element (preformatted text), which uses a fixed-width font (usually Courier) and preserves both spaces and line breaks. Alternatively &lt;br&gt; can be used for each new line.`],
        [`Explain the HTML style attribute and the basic CSS properties used with it, with examples.`, `The style attribute sets the style of one element: <code>&lt;tagname style="property:value;"&gt;</code>, where property is a CSS property and value a CSS value. Common properties: <b>background-color</b> (<code>&lt;body style="background-color:powderblue;"&gt;</code>), <b>color</b> for text (<code>&lt;h1 style="color:blue;"&gt;</code>), <b>font-family</b> (<code>style="font-family:verdana;"</code>), <b>font-size</b> (<code>style="font-size:300%;"</code>), <b>text-align</b> (<code>style="text-align:center;"</code>) and <b>border</b> (<code>style="border:2px solid Tomato;"</code>). Several properties are separated by semicolons.`],
        [`Explain the ways of specifying colors in HTML with an example of each.`, `By <b>name</b> (140 standard names, e.g. Tomato); <b>RGB</b> rgb(255, 99, 71); <b>HEX</b> #ff6347; <b>HSL</b> hsl(9, 100%, 64%); and transparent versions <b>RGBA</b> rgba(255, 99, 71, 0.5) and <b>HSLA</b> hsla(9, 100%, 64%, 0.5) where the last value is alpha (opacity). Shades of gray use equal RGB values, e.g. rgb(200,200,200). Colors apply to background-color, color (text) and border.`]
      ],
      quiz: [
        { q: `Choose the correct HTML element to define important text`, o: [
          [`&lt;i&gt;`, `&lt;i&gt; is italic text.`],
          [`&lt;strong&gt;`, `Correct. &lt;strong&gt; = important text.`],
          [`&lt;b&gt;`, `&lt;b&gt; is bold only, with no extra importance.`],
          [`&lt;important&gt;`, `No such element.`]
        ], a: 1, src: `Exam 2024/25, 2023/24, Midterm 2023/24` },
        { q: `Which HTML tag is used to display the power in an expression?`, o: [
          [`&lt;p&gt;`, `&lt;p&gt; is a paragraph.`],
          [`&lt;sub&gt;`, `&lt;sub&gt; is subscript (below the line), used for H<sub>2</sub>O.`],
          [`&lt;sup&gt;`, `Correct. Superscript appears half a character above the line.`],
          [`None of the above`, `C is correct.`]
        ], a: 2, src: `Exam 2024/25, 2023/24 (May), Midterm 2023/24` },
        { q: `Which property is used to change the background color?`, o: [
          [`background-color`, `Correct. The CSS background-color property.`],
          [`color`, `color changes the text color.`],
          [`bgcolor`, `bgcolor is an obsolete HTML attribute, not a CSS property.`],
          [`None`, `A is correct.`]
        ], a: 0, src: `Exam 2024/25, Midterm 2023/24` },
        { q: `What is the correct HTML for adding a background color?`, o: [
          [`&lt;body style="background-color:yellow;"&gt;`, `Correct. Uses the style attribute with background-color.`],
          [`&lt;background&gt;yellow&lt;/background&gt;`, `No &lt;background&gt; element exists.`],
          [`&lt;body bg="yellow"&gt;`, `bg is not an attribute.`],
          [`None of the above`, `A is correct.`]
        ], a: 0, src: `Exam 2023/24, Midterm 2023/24 (Form B)` },
        { q: `Which property is used to change the font of an element?`, o: [
          [`font-family`, `Correct. e.g. font-family: verdana;`],
          [`font-weight`, `Sets boldness.`],
          [`font-style`, `Sets italic/normal.`],
          [`font-property`, `Not a CSS property.`]
        ], a: 0, src: `Exam 2024/25, 2023/24, Midterm 2023/24 (Form C)` },
        { q: `Colors are defined in HTML using?`, o: [
          [`RGB values`, `True, but not the only way.`],
          [`HEX values`, `True, but not the only way.`],
          [`RGBA values`, `True, but not the only way.`],
          [`All of the above`, `Correct. Names, RGB, HEX, HSL, RGBA and HSLA all work (L3).`]
        ], a: 3, src: `Exam 2025/26` },
        { q: `Choose the correct HTML element to define emphasized text`, o: [
          [`&lt;italic&gt;`, `No such element.`],
          [`&lt;i&gt;`, `&lt;i&gt; is italic without emphasis meaning.`],
          [`&lt;em&gt;`, `Correct. &lt;em&gt; = emphasized text.`]
        ], a: 2, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `What is the correct HTML element for inserting a line break?`, o: [
          [`&lt;break&gt;`, `No such element.`],
          [`&lt;lb&gt;`, `No such element.`],
          [`&lt;br&gt;`, `Correct. Empty element, no end tag.`]
        ], a: 2, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `What is the correct HTML for inserting a background image?`, o: [
          [`&lt;body style="background-image:url(background.gif)"&gt;`, `Correct. CSS background-image with url().`],
          [`&lt;background img="background.gif"&gt;`, `No such element.`],
          [`&lt;body bg="background.gif"&gt;`, `bg is not valid.`]
        ], a: 0, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `If the background image is smaller than the screen, what will happen?`, o: [
          [`It will be stretched`, `Stretching requires background-size.`],
          [`It will leave a blank space at the bottom of your page`, `By default it is not left blank.`],
          [`It will be repeated`, `Correct. By default the image is repeated to cover the element (background-repeat).`],
          [`None of the above`, `C is correct.`]
        ], a: 2, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `Which element is used to get highlighted text in HTML5?`, o: [
          [`&lt;u&gt;`, `Underline.`],
          [`&lt;mark&gt;`, `Correct. Marked/highlighted text.`],
          [`&lt;highlight&gt;`, `No such element.`],
          [`&lt;b&gt;`, `Bold.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `Which HTML tag is used for making character appearance bold?`, o: [
          [`&lt;u&gt;content&lt;/u&gt;`, `Underline.`],
          [`&lt;b&gt;content&lt;/b&gt;`, `Correct.`],
          [`&lt;br&gt;content&lt;/br&gt;`, `&lt;br&gt; is an empty line-break element.`],
          [`&lt;i&gt;content&lt;/i&gt;`, `Italic.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `To show deleted text, which HTML element is used?`, o: [
          [`&lt;del&gt;`, `Correct. Browsers strike a line through it.`],
          [`&lt;em&gt;`, `Emphasis.`],
          [`&lt;strong&gt;`, `Importance.`],
          [`&lt;ins&gt;`, `Inserted text (underlined).`]
        ], a: 0, src: `Sheet 1 (2025/26)` },
        { q: `What is the use of the &lt;hr&gt; tag in HTML?`, o: [
          [`For making content appear in italics`, `That is &lt;i&gt;.`],
          [`To create a vertical rule between sections`, `It is horizontal.`],
          [`To create a line break`, `That is &lt;br&gt;.`],
          [`To create a horizontal rule between sections`, `Correct. A thematic break shown as a horizontal rule.`]
        ], a: 3, src: `Sheet 1 (2025/26)` },
        { q: `For writing the chemical formula of water, which HTML tag will be used?`, o: [
          [`&lt;ul&gt;`, `Unordered list.`],
          [`&lt;br/&gt;`, `Line break.`],
          [`&lt;sub&gt;`, `Correct. H&lt;sub&gt;2&lt;/sub&gt;O.`],
          [`&lt;sup&gt;`, `Superscript is above the line.`]
        ], a: 2, src: `Sheet 1 (2025/26)` },
        { q: `Which tag is used to underline the text in HTML?`, o: [
          [`&lt;p&gt;`, `Paragraph.`],
          [`&lt;u&gt;`, `Correct.`],
          [`&lt;i&gt;`, `Italic.`],
          [`&lt;ul&gt;`, `Unordered list.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `Which element works similar to the &lt;b&gt; element?`, o: [
          [`&lt;blockquote&gt;`, `A block quotation.`],
          [`&lt;strong&gt;`, `Correct. Also displayed bold (with importance).`],
          [`&lt;em&gt;`, `Displayed italic.`],
          [`&lt;i&gt;`, `Italic.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `Which element defines preformatted text?`, o: [
          [`&lt;p&gt;`, `Collapses spaces and line breaks.`],
          [`&lt;pre&gt;`, `Correct. Fixed-width font, keeps spaces and line breaks.`],
          [`&lt;hr&gt;`, `Horizontal rule.`],
          [`&lt;ins&gt;`, `Inserted text.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `In HTML5, which element defines a thematic change in the content?`, o: [
          [`&lt;hr&gt;`, `Correct. &lt;hr&gt; defines a thematic break.`],
          [`&lt;h1&gt;`, `A heading.`],
          [`&lt;head&gt;`, `Metadata container.`],
          [`&lt;p&gt;`, `A paragraph.`]
        ], a: 0, src: `Sheet 1 (2025/26)` },
        { q: `Which tag is used to create a blank line (new line) in HTML?`, o: [
          [`&lt;b&gt;`, `Bold.`],
          [`&lt;br&gt;`, `Correct. Line break.`],
          [`&lt;em&gt;`, `Emphasis.`],
          [`&lt;a&gt;`, `Link.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `<code>rgba(255, 99, 71, 0.5)</code> is:`, o: [
          [`Tomato, 50% transparent`, `Correct. The 4th value is the alpha (opacity) from 0 to 1.`],
          [`Tomato, 50% darker`, `Alpha changes transparency, not darkness.`],
          [`A shade of gray`, `Gray needs equal R, G and B.`],
          [`Invalid CSS`, `rgba() is valid.`]
        ], a: 0, src: `Lecture 3 example` }
      ]
    },
    /* ───────────────────────── LECTURE 4 ───────────────────────── */
    {
      n: 4, title: `CSS: Cascading Style Sheets`,
      notes: [
        { h: `What is CSS?`, pts: [
          `<b>Cascading Style Sheets (CSS)</b> is used to <b>format the layout</b> of a webpage.`,
          `With CSS you control the color, font, size of text, spacing between elements, how elements are positioned and laid out, background images or colors, different displays for different devices and screen sizes, and much more.`,
          `Lab 4: CSS describes how HTML elements are displayed on screen, paper or other media; it <b>saves a lot of work</b> because it can control the layout of multiple pages at once. It solves two problems: <b>presentation</b> of specific elements and <b>layout</b>.`,
          `How the layers fit (L7): HTML = <b>content layer</b> (structure and semantics), CSS = <b>presentation layer</b>, JavaScript = <b>behavior layer</b>.`
        ]},
        { h: `Three ways to add CSS`, table: [
          [`Type`, `How`, `Scope`],
          [`Inline`, `style attribute inside the element: &lt;h1 style="color:blue;"&gt;`, `A unique style for a single element`],
          [`Internal (embedded)`, `&lt;style&gt; element inside &lt;head&gt;`, `Styles for a single HTML page`],
          [`External`, `&lt;link rel="stylesheet" href="styles.css"&gt; in &lt;head&gt;`, `Styles for many pages; the .css file contains no HTML and must be saved with a .css extension`]
        ]},
        { h: `Internal and external examples`, code: `<!-- Internal CSS -->
<head>
<style>
  body {background-color: powderblue;}
  h1   {color: blue; font-family: verdana; font-size: 300%;}
  p    {color: red;  font-family: courier; font-size: 160%;}
</style>
</head>

<!-- External CSS: link in the head of EACH page -->
<link rel="stylesheet" href="styles.css">                        <!-- same folder -->
<link rel="stylesheet" href="/html/styles.css">                  <!-- html folder of this site -->
<link rel="stylesheet" href="https://www.mmm.com/html/styles.css"> <!-- full URL -->

/* styles.css (no HTML inside) */
body { background-color: powderblue; }
h1   { color: blue; }
p    { color: red; }` },
        { h: `CSS syntax and selectors (Lab 4)`, pts: [
          `A rule = <b>selector</b> + <b>declaration block</b> in curly braces <code>{ }</code>. Each declaration is <code>property: value;</code> (colon between, semicolon at the end). Correct syntax: <code>body {color: black;}</code>.`,
          `CSS comments: <code>/* this is a comment */</code>.`,
          `<b>Element selector</b> <code>p</code>: selects all &lt;p&gt; elements.`,
          `<b>id selector</b> <code>#id1</code>: selects the element with id="id1" (ids are unique).`,
          `<b>class selector</b> <code>.c1</code>: selects all elements with class="c1" (<code>p.c1</code> = only &lt;p&gt; with that class).`,
          `<b>Grouping selector</b> <code>p, h1</code>: selects all &lt;p&gt; and all &lt;h1&gt;.`,
          `<b>Universal selector</b> <code>*</code>: selects all elements.`,
          `Also used in labs/exams: descendant <code>li a</code>, pseudo-classes <code>a:hover</code>, <code>a:visited</code>, <code>a:active</code>, <code>tr:nth-child(even)</code>.`
        ]},
        { h: `Colors, fonts and sizes`, pts: [
          `<b>color</b>: text color. <b>font-family</b>: the font. <b>font-size</b>: text size (e.g. 300%, 16px).`,
          `<b>font-weight: bold</b> makes text bold; <b>font-style: italic</b> makes it italic; <b>text-decoration</b> adds underline/overline/line-through (none removes link underlines).`,
          `Background properties (Lab 4): <b>background-color</b>, <b>background-image</b> (repeated by default to cover the element), <b>background-repeat</b>, <b>background-attachment</b> (scroll or fixed), <b>background-position</b>.`
        ]},
        { h: `The CSS box model`, pts: [
          `Every element is a box made of (inside to outside): the <b>content</b>, <b>padding</b>, <b>border</b>, <b>margin</b>.`,
          `<b>border</b>: a border around the element, e.g. <code>border: 2px solid powderblue;</code> (width, style, color).`,
          `<b>padding</b>: space <b>between the text and the border</b> (inside the border).`,
          `<b>margin</b>: space <b>outside the border</b>.`
        ]},
        { h: `Margin / padding / border-width shorthand (Lab 5)`, table: [
          [`Values`, `Meaning`],
          [`margin: 25px;`, `All four sides 25px`],
          [`margin: 25px 50px;`, `Top and bottom 25px, right and left 50px`],
          [`margin: 25px 50px 75px;`, `Top 25px, right and left 50px, bottom 75px`],
          [`margin: 25px 50px 75px 100px;`, `Top, right, bottom, left (clockwise)`],
          [`border-width: 10px 1px 5px 20px;`, `Top 10, right 1, bottom 5, left 20`],
          [`margin-left / padding-left`, `Single side`]
        ]},
        { h: `Positioning and layout (labs, exam essay)`, pts: [
          `<b>position</b> controls how an element is positioned: <code>static</code> (default, normal flow), <code>relative</code> (offset from its normal place with top/left), <code>absolute</code> (relative to nearest positioned ancestor), <code>fixed</code> (relative to the window), <code>sticky</code>.`,
          `<b>float</b> (left/right) pushes an element to one side so text wraps around it; used to build horizontal navigation bars (<code>li {float:left;}</code>).`,
          `<b>display</b>: block, inline, none, flex, grid. Lab 6: <b>Grid</b> divides a page into regions (<code>grid-template-columns: auto auto;</code>, <code>repeat(3,300px)</code>), <b>Flexbox</b> lays items in a row or column.`,
          `Navigation bar = list of links: <code>ul {list-style-type:none; margin:0; padding:0; overflow:hidden;}</code>, <code>li {float:left;}</code>, <code>li a {display:block; padding:14px 16px; text-decoration:none;}</code>, <code>li a:hover {background-color:#111;}</code>.`
        ]}
      ],
      cards: [
        [`CSS stands for`, `Cascading Style Sheets.`],
        [`Three ways to insert CSS`, `Inline (style attribute), internal (&lt;style&gt; in head), external (&lt;link&gt; to a .css file).`],
        [`Inline CSS scope`, `A unique style for a single element.`],
        [`Internal CSS scope`, `One HTML page.`],
        [`External CSS scope`, `Many pages; file has .css extension and no HTML.`],
        [`Link to external style sheet`, `&lt;link rel="stylesheet" type="text/css" href="mystyle.css"&gt; in the head.`],
        [`Tag for internal style sheet`, `&lt;style&gt;.`],
        [`Correct CSS syntax`, `body {color: black;}`],
        [`CSS comment`, `/* comment */`],
        [`id vs class selector`, `#id selects one unique element; .class selects all elements with that class.`],
        [`Box model order (inside out)`, `Content, padding, border, margin.`],
        [`Padding`, `Space between the content and the border.`],
        [`Margin`, `Space outside the border.`],
        [`margin: 25px 50px;`, `Top/bottom 25px, left/right 50px.`],
        [`4-value order`, `Top, right, bottom, left.`],
        [`Make all &lt;p&gt; bold`, `p {font-weight: bold;}`],
        [`Background image smaller than screen`, `It is repeated by default.`],
        [`Property controlling positioning`, `position.`]
      ],
      qa: [
        [`What is CSS? Explain the different types of CSS.`, `CSS (Cascading Style Sheets) is used to format the layout of a web page: colors, fonts, text size, spacing, positioning, backgrounds and display on different devices. It can be added in 3 ways: <b>Inline</b> using the style attribute inside an element, for a unique style on a single element (<code>&lt;h1 style="color:blue;"&gt;</code>); <b>Internal</b> using a &lt;style&gt; element in the &lt;head&gt;, for a single page (<code>&lt;style&gt; p {color:red;} &lt;/style&gt;</code>); <b>External</b> using a &lt;link rel="stylesheet" href="styles.css"&gt; element in the head of each page, for many pages; the .css file contains no HTML. External files can be referenced with a full URL or a relative path.`],
        [`List in detail the types of CSS selectors.`, `<b>Element</b> selector (p) selects all elements of that name; <b>id</b> selector (#id1) selects the unique element with that id; <b>class</b> selector (.c1) selects all elements with that class, and p.c1 restricts it to &lt;p&gt;; <b>grouping</b> selector (p, h1) applies one rule to several selectors; <b>universal</b> selector (*) selects every element. Other common forms: descendant (li a), pseudo-classes (a:hover, a:visited, tr:nth-child(even)).`],
        [`Explain the CSS box model, margin and padding with an example.`, `Every element is a box: content, then padding (space between the content and the border), then the border, then margin (space outside the border). Example: <code>p {border: 2px solid powderblue; padding: 30px; margin: 50px;}</code> gives each paragraph a 2px border, 30px inner space and 50px outer space. Shorthand: one value = all sides; two = top/bottom and left/right; three = top, left/right, bottom; four = top, right, bottom, left.`],
        [`Compare inline, embedded and external style sheets.`, `Inline: style attribute on the element; highest priority; affects one element; mixes style with content and is hard to maintain. Embedded (internal): &lt;style&gt; in the head; affects one page; good for single-page styles. External: separate .css file linked with &lt;link&gt;; affects many pages; one change restyles the whole site, the file is cached by the browser, and it keeps content and presentation separate (advantage of external sheets).`],
        [`Write HTML and CSS code to: (i) set the background color of active links to yellow, (ii) set unordered list style to square, (iii) set "paper.gif" as the page background image.`, `<pre>&lt;style&gt;
a:active { background-color: yellow; }
ul { list-style-type: square; }
body { background-image: url("paper.gif"); }
&lt;/style&gt;</pre>`]
      ],
      quiz: [
        { q: `What does CSS stand for?`, o: [
          [`Computer Style Sheets`, `Not the real expansion.`],
          [`Creative Style Sheets`, `Not the real expansion.`],
          [`Cascading Style Sheets`, `Correct.`],
          [`Colorful Style Sheets`, `Not the real expansion.`]
        ], a: 2, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `What is the correct HTML for referring to an external style sheet?`, o: [
          [`&lt;link rel="stylesheet" type="text/css" href="mystyle.css"&gt;`, `Correct. &lt;link&gt; in the head with rel="stylesheet" and href.`],
          [`&lt;stylesheet&gt;mystyle.css&lt;/stylesheet&gt;`, `No such element.`],
          [`&lt;style src="mystyle.css"&gt;`, `&lt;style&gt; holds internal CSS; it has no src.`],
          [`Not Found`, `A is correct.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `Which CSS property controls the text size?`, o: [
          [`text-style`, `Not a CSS property.`],
          [`text-size`, `Not a CSS property.`],
          [`font-style`, `font-style sets italic/normal.`],
          [`font-size`, `Correct.`]
        ], a: 3, src: `Exam 2025/26` },
        { q: `Which of the following properties is used to specify table borders in CSS?`, o: [
          [`table`, `table is a selector, not a property.`],
          [`border`, `Correct. table, th, td {border: 1px solid black;} (L5).`],
          [`table:border`, `Not valid CSS.`],
          [`none of the mentioned`, `B is correct.`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `Which property is used to control the space between the border and content in a table?`, o: [
          [`border`, `Draws the border.`],
          [`margin`, `Space outside the border.`],
          [`padding`, `Correct. Padding is the space between the content and the border.`],
          [`resize`, `Unrelated.`]
        ], a: 2, src: `Exam 2025/26` },
        { q: `How do you add a background color for all &lt;h1&gt; elements?`, o: [
          [`h1.all {background-color:#FFFFFF;}`, `This selects &lt;h1 class="all"&gt; only.`],
          [`all.h1 {background-color:#FFFFFF;}`, `This selects &lt;all class="h1"&gt;.`],
          [`h1 {background-color:#FFFFFF;}`, `Correct. The element selector h1 targets all &lt;h1&gt;.`],
          [`None of the above`, `C is correct.`]
        ], a: 2, src: `Exam 2024/25, 2023/24 (May), Midterm 2023/24` },
        { q: `Which is the correct CSS syntax?`, o: [
          [`{body;color:black;}`, `The selector must be outside the braces.`],
          [`body:color=black;`, `CSS uses braces and colons, not =.`],
          [`body {color: black;}`, `Correct. selector {property: value;}`],
          [`{body:color=black;}`, `Invalid.`]
        ], a: 2, src: `Exam 2023/24, Midterm 2023/24 (Form B)` },
        { q: `Which of the following HTML tags is used to define an internal style sheet?`, o: [
          [`&lt;script&gt;`, `For JavaScript.`],
          [`&lt;link&gt;`, `For external style sheets.`],
          [`&lt;class&gt;`, `Not an element.`],
          [`&lt;style&gt;`, `Correct. Placed in the &lt;head&gt;.`]
        ], a: 3, src: `Exam 2022/23 Summer` },
        { q: `Which of the following CSS properties is used to set the color of the text?`, o: [
          [`text-decoration`, `Underline/overline/line-through.`],
          [`pallet`, `Not a property.`],
          [`text-style`, `Not a property.`],
          [`color`, `Correct.`]
        ], a: 3, src: `Exam 2022/23 Summer` },
        { q: `Which of the following CSS properties controls how an element is positioned?`, o: [
          [`static`, `static is a value of position, not a property.`],
          [`position`, `Correct. Values: static, relative, absolute, fixed, sticky.`],
          [`fix`, `Not a property.`],
          [`set`, `Not a property.`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `How do you insert a comment in a CSS file?`, o: [
          [`// this is a comment`, `JavaScript single-line syntax; not valid in CSS.`],
          [`' this is a comment`, `VBScript style.`],
          [`// this is a comment //`, `Not CSS.`],
          [`/* this is a comment */`, `Correct.`]
        ], a: 3, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `Which CSS property is used to change the text color of an element?`, o: [
          [`text-color`, `Not a property.`],
          [`color`, `Correct.`],
          [`fgcolor`, `Not a property.`]
        ], a: 1, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `What is the correct CSS syntax for making all the &lt;p&gt; elements bold?`, o: [
          [`&lt;p style="text-size:bold;"&gt;`, `text-size does not exist, and this styles one p only.`],
          [`&lt;p style="font-size:bold;"&gt;`, `font-size takes a size, not bold.`],
          [`p {font-weight:bold;}`, `Correct.`],
          [`p {text-size:bold;}`, `Not a property.`]
        ], a: 2, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `How do you make the text bold?`, o: [
          [`style:bold;`, `Invalid.`],
          [`font:bold;`, `The font shorthand needs size and family too.`],
          [`font-weight:bold;`, `Correct.`]
        ], a: 2, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `How do you display a border like this: top = 10px, bottom = 5px, left = 20px, right = 1px?`, o: [
          [`border-width:10px 20px 5px 1px;`, `This gives right 20 and left 1.`],
          [`border-width:10px 5px 20px 1px;`, `Order is wrong.`],
          [`border-width:10px 1px 5px 20px;`, `Correct. Order is top, right, bottom, left.`],
          [`border-width:5px 20px 10px 1px;`, `Starts with bottom.`]
        ], a: 2, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `Which property is used to change the left margin of an element?`, o: [
          [`indent`, `Not a property (text-indent indents the first line).`],
          [`margin-left`, `Correct.`],
          [`padding-left`, `That is inside the border.`]
        ], a: 1, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `Which element is used for styling HTML5 layout?`, o: [
          [`CSS`, `Correct. CSS is the presentation layer.`],
          [`jQuery`, `A JavaScript library.`],
          [`JavaScript`, `Behavior layer.`],
          [`PHP`, `Server-side language.`]
        ], a: 0, src: `Sheet 1 (2025/26)` },
        { q: `<code>p {margin: 25px 50px 75px;}</code> gives a left margin of:`, o: [
          [`25px`, `25px is the top.`],
          [`50px`, `Correct. Three values: top, left and right, bottom.`],
          [`75px`, `75px is the bottom.`],
          [`0`, `The middle value sets both left and right.`]
        ], a: 1, src: `Lecture 4 example` },
        { q: `In the CSS box model, the space between the text and the border is the:`, o: [
          [`margin`, `Margin is outside the border.`],
          [`padding`, `Correct.`],
          [`outline`, `An outline is drawn outside the border.`],
          [`content`, `Content is the text itself.`]
        ], a: 1, src: `Lecture 4 example` }
      ]
    },
    /* ───────────────────────── LECTURE 5 ───────────────────────── */
    {
      n: 5, title: `HTML (III): Lists and Tables`,
      notes: [
        { h: `Lists overview`, pts: [
          `HTML lists group a set of related items. Three kinds: <b>unordered</b> (<code>&lt;ul&gt;</code>, bullets), <b>ordered</b> (<code>&lt;ol&gt;</code>, numbers), and <b>description</b> lists (<code>&lt;dl&gt;</code>).`,
          `Each item in &lt;ul&gt; or &lt;ol&gt; starts with <code>&lt;li&gt;</code>. Unordered items are marked with <b>bullets (small black circles)</b> by default; ordered items with <b>numbers</b>.`,
          `Lists can be <b>nested</b> (a list inside an &lt;li&gt;).`,
          `A <b>navigation bar</b> is a list of links: <code>&lt;ul&gt;&lt;li&gt;&lt;a href="#home"&gt;Home&lt;/a&gt;&lt;/li&gt;...&lt;/ul&gt;</code> styled with CSS.`
        ]},
        { h: `list-style-type (unordered list marker)`, table: [
          [`Value`, `Marker`],
          [`disc`, `Bullet (default)`],
          [`circle`, `Circle`],
          [`square`, `Square`],
          [`none`, `No marker`]
        ]},
        { h: `Ordered list: type and start attributes`, table: [
          [`Attribute`, `Numbering`],
          [`type="1"`, `Numbers (default)`],
          [`type="A"`, `Uppercase letters`],
          [`type="a"`, `Lowercase letters`],
          [`type="I"`, `Uppercase roman numbers`],
          [`type="i"`, `Lowercase roman numbers`],
          [`start="50"`, `Start counting from 50 instead of 1`]
        ]},
        { h: `Description list`, code: `<dl>
  <dt>Coffee</dt>          <!-- term (name) -->
  <dd>- black hot drink</dd> <!-- description of the term -->
  <dt>Milk</dt>
  <dd>- white cold drink</dd>
</dl>

<ul style="list-style-type:square;">  <!-- square bullets -->
  <li>Coffee</li>
  <li>Tea
    <ul><li>Black tea</li><li>Green tea</li></ul>  <!-- nested -->
  </li>
</ul>
<ol type="A" start="3"> <li>Coffee</li> <li>Tea</li> </ol>  <!-- C, D -->` },
        { h: `Tables: basic tags`, pts: [
          `Tables display rows and columns of data and can create multi-column text, captions for images and sidebars.`,
          `<code>&lt;table&gt;</code> creates the table; <code>&lt;tr&gt;</code> defines a row; <code>&lt;td&gt;</code> defines a data cell; <code>&lt;th&gt;</code> defines a <b>header cell</b> (bold and centered by default).`,
          `Other table tags: <code>&lt;caption&gt;</code> (table caption), <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tfoot&gt;</code>. The valid set "all table elements" is &lt;table&gt;&lt;tr&gt;&lt;td&gt;.`,
          `<b>colspan</b> makes a cell span several <b>columns</b>; <b>rowspan</b> makes it span several <b>rows</b>.`
        ]},
        { h: `Table borders and sizes (CSS)`, pts: [
          `Borders: <code>table, th, td { border: 1px solid black; }</code> (adds a border around the table and each cell, giving double borders).`,
          `<b>border-collapse: collapse;</b> collapses double borders into a single border.`,
          `Invisible-border look: white borders with a cell background color (<code>background-color:#96D4D4</code>).`,
          `<b>border-radius: 10px;</b> rounds corners; leave <code>table</code> out of the selector to skip the outer border.`,
          `<b>border-style: dotted;</b> (also dashed, solid, double...), <b>border-color</b>.`,
          `Sizes: <code>&lt;table style="width:100%"&gt;</code>; column width on a &lt;th&gt;/&lt;td&gt; (<code>style="width:70%"</code>); row height on a &lt;tr&gt; (<code>style="height:200px"</code>).`,
          `Zebra/striped rows: <code>tr:nth-child(even) {background-color: #f2f2f2;}</code>. A <b>responsive table</b> shows a horizontal scroll bar on small screens (wrap it in a div with <code>overflow-x:auto</code>).`
        ]},
        { h: `colspan and rowspan example`, code: `<style>
table, th, td { border: 1px solid black; border-collapse: collapse; }
</style>
<table style="width:100%">
  <tr> <th colspan="2">Name</th> <th>Age</th> </tr>   <!-- Name spans 2 columns -->
  <tr> <td>Jill</td> <td>Smith</td> <td>43</td> </tr>
</table>

<table>
  <tr> <th>Name</th> <td>Jill</td> </tr>
  <tr> <th rowspan="2">Phone</th> <td>555-1234</td> </tr>  <!-- Phone spans 2 rows -->
  <tr> <td>555-8745</td> </tr>
</table>` },
        { h: `How to build an irregular table (exam method)`, pts: [
          `1) Count the <b>total columns</b> of the widest row (smallest unit width) and the number of rows.`,
          `2) Write each row as a &lt;tr&gt;; for each cell starting in that row, write a &lt;td&gt; with colspan = number of unit columns it covers and rowspan = number of rows it covers.`,
          `3) In later rows, <b>skip</b> the positions already occupied by a cell with rowspan from above.`,
          `4) Check: in every row, (sum of colspans of new cells) + (columns still covered by rowspans from above) = total columns.`
        ]}
      ],
      cards: [
        [`Unordered list tag`, `&lt;ul&gt; (bullets).`],
        [`Ordered list tag`, `&lt;ol&gt; (numbers).`],
        [`List item tag`, `&lt;li&gt;.`],
        [`Description list tags`, `&lt;dl&gt; list, &lt;dt&gt; term, &lt;dd&gt; description.`],
        [`Default ul marker`, `disc (small black circle).`],
        [`Square bullets`, `list-style-type: square;`],
        [`Uppercase roman numbering`, `&lt;ol type="I"&gt;.`],
        [`Start an ordered list at 3`, `&lt;ol start="3"&gt;.`],
        [`Table row / data cell / header cell`, `&lt;tr&gt; / &lt;td&gt; / &lt;th&gt;.`],
        [`Table caption`, `&lt;caption&gt;.`],
        [`Cell across 2 columns`, `colspan="2".`],
        [`Cell across 2 rows`, `rowspan="2".`],
        [`Single border instead of double`, `border-collapse: collapse;`],
        [`Rounded cell borders`, `border-radius: 10px;`],
        [`Striped rows`, `tr:nth-child(even) {background-color:#f2f2f2;}`],
        [`Column width`, `style="width:70%" on a th/td.`]
      ],
      qa: [
        [`List and explain the various list tags in HTML with examples.`, `<b>Unordered list</b> &lt;ul&gt; with &lt;li&gt; items, marked by bullets (disc by default; list-style-type can be circle, square or none). <b>Ordered list</b> &lt;ol&gt; with &lt;li&gt; items, numbered; the type attribute chooses 1, A, a, I, i and start chooses the first number (&lt;ol start="50"&gt;). <b>Description list</b> &lt;dl&gt; with terms &lt;dt&gt; and descriptions &lt;dd&gt;. Lists can be nested, and a list of links styled with CSS forms a navigation bar.`],
        [`What is an HTML table? Explain rowspan and colspan with the necessary tags.`, `A table displays data in rows and columns using &lt;table&gt;, rows &lt;tr&gt;, data cells &lt;td&gt; and header cells &lt;th&gt; (bold, centered); &lt;caption&gt; adds a title. <b>colspan="n"</b> on a cell makes it span n columns (e.g. &lt;th colspan="2"&gt;Name&lt;/th&gt; over First and Last name). <b>rowspan="n"</b> makes it span n rows (e.g. &lt;th rowspan="2"&gt;Phone&lt;/th&gt; for two phone numbers); in the following row that position is skipped. Borders are added with CSS border and merged with border-collapse: collapse.`],
        [`Explain how to style HTML table borders and sizes with CSS.`, `Add borders with <code>table, th, td { border: 1px solid black; }</code>; this gives double borders (table + each cell), so use <code>border-collapse: collapse;</code> to merge them into a single border. <code>border-radius: 10px</code> rounds the corners (leave table out of the selector to skip the outer border); <code>border-style: dotted</code> and <code>border-color: #96D4D4</code> change the line; white borders plus a cell background color give an invisible-border look. Sizes: <code>&lt;table style="width:100%"&gt;</code> for the table, <code>style="width:70%"</code> on a th/td for a column, <code>style="height:200px"</code> on a tr for a row. Striped rows: <code>tr:nth-child(even) {background-color:#f2f2f2;}</code>.`],
        [`Write HTML for this table: row 1: A spans 2 columns, B spans 2 rows; row 2: C spans 2 rows, D; row 3: E spans 2 columns.`, `<pre>&lt;table border="1"&gt;
  &lt;tr&gt; &lt;th colspan="2"&gt;A&lt;/th&gt; &lt;th rowspan="2"&gt;B&lt;/th&gt; &lt;/tr&gt;
  &lt;tr&gt; &lt;th rowspan="2"&gt;C&lt;/th&gt; &lt;th&gt;D&lt;/th&gt; &lt;/tr&gt;
  &lt;tr&gt; &lt;th colspan="2"&gt;E&lt;/th&gt; &lt;/tr&gt;
&lt;/table&gt;</pre>Check with 3 unit columns: row 1 = 2 + 1; row 2 = C + D + (B from above) = 3; row 3 = (C from above) + E(2) = 3.`]
      ],
      quiz: [
        { q: `Which of these elements are all &lt;table&gt; elements?`, o: [
          [`&lt;table&gt;&lt;head&gt;&lt;tfoot&gt;`, `&lt;head&gt; is the document head, not a table element.`],
          [`&lt;table&gt;&lt;tr&gt;&lt;tt&gt;`, `&lt;tt&gt; is (obsolete) teletype text.`],
          [`&lt;table&gt;&lt;tr&gt;&lt;td&gt;`, `Correct. Table, row and data cell.`],
          [`&lt;thead&gt;&lt;body&gt;&lt;tr&gt;`, `&lt;body&gt; is not a table element (&lt;tbody&gt; is).`]
        ], a: 2, src: `Exam 2024/25, 2023/24, Midterm 2023/24` },
        { q: `How can you make a bulleted list?`, o: [
          [`&lt;list&gt;`, `No such element.`],
          [`&lt;ol&gt;`, `Ordered (numbered) list.`],
          [`&lt;ul&gt;`, `Correct. Unordered list with bullets.`],
          [`&lt;dl&gt;`, `Description list.`]
        ], a: 2, src: `Exam 2024/25, 2023/24, Midterm 2023/24` },
        { q: `How can you make a numbered list?`, o: [
          [`&lt;list&gt;`, `No such element.`],
          [`&lt;ol&gt;`, `Correct. Ordered list.`],
          [`&lt;ul&gt;`, `Bulleted.`],
          [`&lt;dl&gt;`, `Description list.`]
        ], a: 1, src: `Midterm 2023/24 (Form B)` },
        { q: `How do you make a list that lists its items with squares?`, o: [
          [`list: square;`, `Not a property.`],
          [`list-type: square;`, `Not a property.`],
          [`list-style-type: square;`, `Correct.`],
          [`None of the above`, `C is correct.`]
        ], a: 2, src: `Exam 2023/24, Midterm 2023/24 (Form C)` },
        { q: `To start a list at the count of 3, use:`, o: [
          [`&lt;ol begin="3"&gt;`, `No begin attribute.`],
          [`&lt;ol list="3"&gt;`, `No list attribute.`],
          [`&lt;ol start="3"&gt;`, `Correct. The start attribute.`],
          [`&lt;ol num="3"&gt;`, `No num attribute.`]
        ], a: 2, src: `Midterm 2023/24 (Form C)` },
        { q: `Which of the following HTML tags is used to create an unordered list?`, o: [
          [`&lt;ol&gt;`, `Ordered.`],
          [`&lt;ul&gt;`, `Correct.`],
          [`&lt;li&gt;`, `A list item.`],
          [`&lt;ll&gt;`, `No such tag.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `Which of the following HTML tags is used to add a row in a table?`, o: [
          [`&lt;th&gt;`, `Header cell.`],
          [`&lt;td&gt;`, `Data cell.`],
          [`&lt;tr&gt;`, `Correct. Table row.`],
          [`&lt;tt&gt;`, `Not a table tag.`]
        ], a: 2, src: `Sheet 1 (2025/26)` },
        { q: `Each cell of the table can be represented by using __________`, o: [
          [`&lt;tr&gt;`, `A row, not a cell.`],
          [`&lt;td&gt;`, `Correct. Table data cell.`],
          [`&lt;th&gt;`, `Only header cells.`],
          [`&lt;thead&gt;`, `Header group.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `For heading cells of a table we can use ____________`, o: [
          [`&lt;td&gt;`, `Data cell.`],
          [`&lt;tr&gt;`, `Row.`],
          [`&lt;thead&gt;`, `A group of header rows, not a cell.`],
          [`&lt;th&gt;`, `Correct. Header cell.`]
        ], a: 3, src: `Sheet 1 (2025/26)` },
        { q: `For adding a caption to the table we use ____________`, o: [
          [`&lt;caption&gt;`, `Correct.`],
          [`&lt;thead&gt;`, `Header group.`],
          [`&lt;th&gt;`, `Header cell.`],
          [`&lt;tr&gt;`, `Row.`]
        ], a: 0, src: `Sheet 1 (2025/26)` },
        { q: `Which tag is used to create a numbered list in HTML?`, o: [
          [`&lt;ol&gt;`, `Correct.`],
          [`&lt;ul&gt;`, `Bulleted.`],
          [`&lt;li&gt;`, `List item.`],
          [`&lt;ll&gt;`, `No such tag.`]
        ], a: 0, src: `Sheet 1 (2025/26)` },
        { q: `border-spacing is given in _____________`, o: [
          [`pixels`, `Correct. Usually in px (e.g. border-spacing: 0).`],
          [`cm`, `Possible CSS unit but not the expected answer.`],
          [`mm`, `Possible CSS unit but not the expected answer.`],
          [`inch`, `Possible CSS unit but not the expected answer.`]
        ], a: 0, src: `Sheet 1 (2025/26)` },
        { q: `Which CSS property removes the double borders of a table?`, o: [
          [`border-radius: collapse;`, `border-radius rounds corners.`],
          [`border-collapse: collapse;`, `Correct. Collapses borders into a single border.`],
          [`border-style: single;`, `single is not a border-style value.`],
          [`border: none;`, `This removes all borders.`]
        ], a: 1, src: `Lecture 5 example` },
        { q: `<code>&lt;ol type="i"&gt;</code> numbers items with:`, o: [
          [`Lowercase letters`, `That is type="a".`],
          [`Uppercase roman numbers`, `That is type="I".`],
          [`Lowercase roman numbers`, `Correct. i, ii, iii...`],
          [`Numbers`, `That is type="1" (default).`]
        ], a: 2, src: `Lecture 5 example` }
      ]
    },
    /* ───────────────────────── LECTURE 6 ───────────────────────── */
    {
      n: 6, title: `HTML (IV): Block/Inline, Iframes, Symbols, XHTML, Forms, Multimedia`,
      notes: [
        { h: `Block-level vs inline elements`, table: [
          [`Feature`, `Block-level`, `Inline`],
          [`Starts on a new line?`, `Always`, `No`],
          [`Default width`, `100% of the parent (full width available)`, `Fits the content (only as much as necessary)`],
          [`Width/height allowed?`, `Yes`, `No`],
          [`Top and bottom margin`, `Yes`, `No`],
          [`Typical container`, `&lt;div&gt;`, `&lt;span&gt;`],
          [`Examples`, `address, article, aside, blockquote, canvas, dd, div, dl, dt, fieldset, figure, footer, form, h1-h6, header, hr, li, main, nav, noscript, ol, p, pre, section, table, ul, video`, `a, abbr, b, br, button, cite, code, em, i, img, input, label, q, script, select, small, span, strong, sub, sup, textarea, time`]
        ]},
        { h: `&lt;div&gt; and &lt;span&gt;`, pts: [
          `<b>&lt;div&gt;</b>: a block-level element often used as a <b>container for other HTML elements</b>; no required attributes (style, class, id are common); with CSS it styles <b>blocks of content</b>.`,
          `<b>&lt;span&gt;</b>: an <b>inline container</b> used to mark up a part of a text or document; with CSS it styles <b>parts of the text</b>: <code>My mother has &lt;span style="color:blue;font-weight:bold"&gt;blue&lt;/span&gt; eyes</code>.`,
          `Every element has a default <b>display</b> value (block or inline) which CSS can change (display: block / inline / flex / grid).`
        ]},
        { h: `Iframes`, pts: [
          `An <b>iframe</b> displays a web page within a web page. The <code>&lt;iframe&gt;</code> tag specifies an <b>inline frame</b>, used to embed another document in the current one (e.g. YouTube videos, maps).`,
          `Size: <code>height="200" width="300"</code> (pixels by default) or CSS <code>style="height:200px;width:300px"</code>. Always add a <b>title</b> for screen readers.`,
          `By default an iframe has a border; remove it with <code>style="border:none;"</code> or change it: <code>style="border:2px solid red;"</code>.`,
          `<b>Iframe as a link target</b>: the link's <b>target</b> attribute must refer to the iframe's <b>name</b> attribute.`
        ]},
        { h: `Iframe target example`, code: `<iframe src="demo_iframe.htm" name="iframe_a" height="300px" width="100%"
        title="Iframe Example"></iframe>
<p><a href="https://www.google.com" target="iframe_a">Google.com</a></p>
<!-- clicking the link opens Google inside the iframe -->` },
        { h: `HTML symbols (entities) and emojis`, pts: [
          `Symbols not on the keyboard (math, technical, currency) are added with an <b>entity name</b> or an <b>entity number</b> (decimal or hexadecimal reference).`,
          `Euro sign three ways: <code>&amp;euro;</code>, <code>&amp;#8364;</code>, <code>&amp;#x20AC;</code>. Copyright: <code>&amp;copy;</code>; less-than <code>&amp;lt;</code>; greater-than <code>&amp;gt;</code>; ampersand <code>&amp;amp;</code>; non-breaking space <code>&amp;nbsp;</code>.`,
          `Math entities: &forall; <code>&amp;forall;</code> (8704), &part; <code>&amp;part;</code> (8706), &exist; <code>&amp;exist;</code> (8707), &empty; <code>&amp;empty;</code> (8709), &nabla; <code>&amp;nabla;</code> (8711), &isin; <code>&amp;isin;</code> (8712), &notin; <code>&amp;notin;</code> (8713), &ni; <code>&amp;ni;</code> (8715), &prod; <code>&amp;prod;</code> (8719), &sum; <code>&amp;sum;</code> (8721).`,
          `<b>Emojis</b> look like images but are <b>characters from the UTF-8 (Unicode) character set</b>. Use <code>&lt;meta charset="UTF-8"&gt;</code> and a decimal reference, e.g. <code>&amp;#128512;</code> (&#128512;), 128516 = &#128516;, 128525 = &#128525;, 128151 = &#128151;.`
        ]},
        { h: `XHTML vs HTML`, pts: [
          `<b>XHTML</b> = EXtensible HyperText Markup Language: a <b>stricter, more XML-based</b> version of HTML; HTML defined as an <b>XML application</b>; supported by all major browsers.`,
          `<b>Why XHTML?</b> To make HTML more extensible and flexible to work with other data formats (XML), and because browsers ignore errors in HTML, XHTML comes with <b>much stricter error handling</b>.`,
          `<b>Most important differences</b>: (1) &lt;!DOCTYPE&gt; is mandatory; (2) the <b>xmlns</b> attribute in &lt;html&gt; is mandatory; (3) &lt;html&gt;, &lt;head&gt;, &lt;title&gt;, &lt;body&gt; are mandatory; (4) elements must always be <b>properly nested</b>; (5) elements must always be <b>closed</b>; (6) elements must be in <b>lowercase</b>; (7) attribute names must be in <b>lowercase</b>; (8) attribute values must always be <b>quoted</b>.`,
          `Empty elements must be closed too: <code>&lt;br /&gt;</code>, <code>&lt;hr /&gt;</code>, <code>&lt;img src="happy.gif" alt="Happy face" /&gt;</code>. Wrong nesting: <code>&lt;b&gt;&lt;i&gt;Some text&lt;/b&gt;&lt;/i&gt;</code>.`
        ]},
        { h: `Forms and input types`, pts: [
          `An HTML <b>form</b> collects user input, usually sent to a server for processing. <code>&lt;form&gt;</code> is a container for input elements: text fields, checkboxes, radio buttons, submit buttons, etc.`,
          `<b>&lt;input&gt;</b> is the most used form element; it displays differently depending on its <b>type</b> attribute. Default type is <b>text</b>.`,
          `<b>type="text"</b>: single-line text field. <b>type="password"</b>: masked text. <b>type="radio"</b>: select <b>ONE</b> of a limited number of choices (same name groups them). <b>type="checkbox"</b>: select <b>ZERO or MORE</b> options. <b>type="submit"</b>: sends form data to a <b>form-handler</b> given in the form's <b>action</b> attribute. Also <b>button</b>, <b>reset</b>, <b>number</b>, <b>email</b>, <b>date</b>, <b>month</b> (month and year), <b>week</b> (week and year), <b>color</b> (color picker), <b>file</b> (file-select field), <b>image</b> (image as submit button), <b>tel</b>, <b>range</b>.`,
          `<b>&lt;label&gt;</b> defines a label; clicking its text toggles the radio/checkbox (helps users who struggle with small regions). The label's <b>for</b> must equal the input's <b>id</b>.`,
          `Form attributes: <b>action</b> (where to send data, e.g. /action_page.php), <b>method</b> (GET or POST). Other controls: <code>&lt;textarea&gt;</code> (multi-line text), <code>&lt;select&gt;</code> with <code>&lt;option&gt;</code> (drop-down; attribute <b>multiple</b>, option attribute <b>selected</b>), <code>&lt;button&gt;</code>, <code>&lt;fieldset&gt;</code>.`
        ]},
        { h: `Form example`, code: `<form action="/action_page.php" method="post">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="Mohamed"><br>
  <input type="radio" id="html" name="fav_language" value="HTML">
  <label for="html">HTML</label><br>
  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
  <label for="vehicle1"> I have a bike</label><br>
  <input type="submit" value="Submit">
</form>` },
        { h: `Multimedia: video and audio`, pts: [
          `Multimedia is anything you can hear or see: images, music, sound, videos, records, films, animations. Common video formats: MP4, WebM, Ogg (MP4 is recommended); audio: MP3, WAV, Ogg.`,
          `<code>&lt;video width="320" height="240" controls&gt;&lt;source src="movie.mp4" type="video/mp4"&gt;&lt;source src="movie.ogg" type="video/ogg"&gt;Your browser does not support the video tag.&lt;/video&gt;</code>`,
          `<b>controls</b> adds play, pause, volume. Always include <b>width and height</b>, otherwise the page might <b>flicker</b> while the video loads. <b>&lt;source&gt;</b> lists alternative files; the browser uses the <b>first recognized format</b>. Text between the tags is shown only in browsers that do not support &lt;video&gt;.`,
          `<b>autoplay</b> starts automatically; add <b>muted</b> after autoplay to let it start (muted). <b>&lt;track&gt;</b> adds subtitles (kind="subtitles").`,
          `<code>&lt;audio controls&gt;&lt;source src="horse.ogg" type="audio/ogg"&gt;&lt;source src="horse.mp3" type="audio/mpeg"&gt;...&lt;/audio&gt;</code> plays audio.`
        ]}
      ],
      cards: [
        [`Block-level element`, `Starts on a new line and takes the full available width; has top/bottom margin.`],
        [`Inline element`, `Does not start on a new line; takes only the width it needs.`],
        [`&lt;div&gt; vs &lt;span&gt;`, `div = block container for elements; span = inline container for part of a text.`],
        [`&lt;iframe&gt;`, `Inline frame that embeds another document in the page.`],
        [`Remove iframe border`, `style="border:none;"`],
        [`Open a link inside an iframe`, `Link target = iframe name.`],
        [`Euro entity`, `&amp;euro; = &amp;#8364; = &amp;#x20AC;`],
        [`Copyright entity`, `&amp;copy;`],
        [`Emojis are...`, `Characters from the UTF-8 (Unicode) set, not images.`],
        [`XHTML`, `EXtensible HyperText Markup Language: stricter XML-based HTML.`],
        [`Attribute mandatory in XHTML &lt;html&gt;`, `xmlns.`],
        [`XHTML empty elements`, `Must be closed: &lt;br /&gt;, &lt;hr /&gt;, &lt;img ... /&gt;.`],
        [`Radio vs checkbox`, `Radio: exactly one choice. Checkbox: zero or more.`],
        [`label for=...`, `Must equal the input's id.`],
        [`Where form data goes`, `To the form-handler named in the action attribute.`],
        [`Default input type`, `text.`],
        [`Multi-line text input`, `&lt;textarea&gt;.`],
        [`Drop-down list`, `&lt;select&gt; with &lt;option&gt;.`],
        [`Video controls attribute`, `controls (play, pause, volume).`],
        [`Why set video width/height?`, `Otherwise the page may flicker while loading.`]
      ],
      qa: [
        [`Explain the main differences between inline and block elements. Give an example for each.`, `A <b>block-level</b> element always starts on a new line, takes the full width available (100% of the parent), accepts width/height and has top and bottom margins; example &lt;div&gt; (also &lt;p&gt;, &lt;h1&gt;, &lt;ul&gt;, &lt;table&gt;, &lt;form&gt;). An <b>inline</b> element does not start on a new line, takes only as much width as necessary, ignores width/height and has no top/bottom margin; example &lt;span&gt; (also &lt;a&gt;, &lt;b&gt;, &lt;img&gt;, &lt;input&gt;). Example: <code>&lt;div style="border:1px solid black"&gt;Hello&lt;/div&gt;</code> spans the whole line while <code>&lt;span style="border:1px solid black"&gt;Hello&lt;/span&gt;</code> only wraps the word.`],
        [`What are the main differences between HTML and XHTML?`, `XHTML is a stricter XML-based version of HTML (HTML defined as an XML application) with strict error handling, while browsers tolerate HTML errors. In XHTML: &lt;!DOCTYPE&gt; is mandatory; the xmlns attribute in &lt;html&gt; is mandatory; &lt;html&gt;, &lt;head&gt;, &lt;title&gt; and &lt;body&gt; are mandatory; elements must be properly nested; elements must always be closed (including empty ones: &lt;br /&gt;); element names must be lowercase; attribute names must be lowercase; attribute values must be quoted.`],
        [`What is an HTML form? Discuss its attributes and the main input types.`, `A form (&lt;form&gt;) collects user input, usually sent to a server. Attributes: <b>action</b> (URL of the form-handler, e.g. /action_page.php), <b>method</b> (GET appends data to the URL; POST sends it in the request body), name, target. Input types: text (single line), password, radio (one choice, grouped by name), checkbox (zero or more), submit (sends data), reset, button, number, email, date, color, file, image, tel. Other controls: &lt;label for="id"&gt;, &lt;textarea&gt;, &lt;select&gt;/&lt;option&gt;, &lt;button&gt;.`],
        [`Explain how to embed video in a page and the role of each attribute/element.`, `Use &lt;video width="320" height="240" controls&gt; with one or more &lt;source src="movie.mp4" type="video/mp4"&gt; children. controls adds play/pause/volume; width and height prevent flicker while loading; the browser uses the first source format it recognizes; text between the tags is shown by browsers that do not support video; autoplay (with muted) starts it automatically; &lt;track&gt; adds subtitles. Audio works the same with &lt;audio controls&gt;.`],
        [`Explain HTML symbols (entities) and how emojis are shown.`, `Characters missing from the keyboard are written as entities: an entity name (&amp;euro;, &amp;copy;, &amp;forall;, &amp;sum;) or an entity number in decimal (&amp;#8364;) or hexadecimal (&amp;#x20AC;). Emojis are Unicode (UTF-8) characters, not images; declare &lt;meta charset="UTF-8"&gt; and write their decimal reference, e.g. &amp;#128512;.`]
      ],
      quiz: [
        { q: `How to create a checkbox in an HTML form?`, o: [
          [`&lt;input type="text"&gt;`, `A single-line text field.`],
          [`&lt;input type="textarea"&gt;`, `textarea is a separate element, not an input type.`],
          [`&lt;input type="checkbox"&gt;`, `Correct. Lets the user select zero or more options.`],
          [`&lt;input type="button"&gt;`, `A clickable button.`]
        ], a: 2, src: `Exam 2025/26` },
        { q: `Block elements are normally displayed without starting a new line.`, o: [
          [`True`, `Block elements always start on a new line.`],
          [`False`, `Correct. It is inline elements that do not start on a new line.`]
        ], a: 1, src: `Revision Sheet 1 (HTML/CSS)` },
        { q: `Which of the following is NOT a difference between HTML and XHTML?`, o: [
          [`Charset in both HTML and XHTML is "text/html"`, `Correct (this statement is false, so it is not a difference): XHTML is served as application/xhtml+xml.`],
          [`Tags and attributes are case-insensitive in HTML but not in XHTML`, `This is a real difference (XHTML requires lowercase).`],
          [`Special characters must be escaped using character entities in XHTML unlike HTML`, `Listed as a difference (XML is stricter about escaping).`],
          [`Charset in HTML is "text/html" whereas in XHTML it is "application/xml+xhtml"`, `This is a real difference in MIME type.`]
        ], a: 0, src: `Sheet 1 (2025/26)` },
        { q: `Which of the following is not an HTML5 tag?`, o: [
          [`&lt;track&gt;`, `HTML5 tag for subtitles.`],
          [`&lt;video&gt;`, `HTML5 tag.`],
          [`&lt;slider&gt;`, `Correct. There is no &lt;slider&gt; (use input type="range").`],
          [`&lt;source&gt;`, `HTML5 tag.`]
        ], a: 2, src: `Sheet 1 (2025/26)` },
        { q: `Which of the following elements in HTML5 defines video or movie content?`, o: [
          [`&lt;video&gt;`, `Correct.`],
          [`&lt;movie&gt;`, `No such element.`],
          [`&lt;audio&gt;`, `Sound only.`],
          [`&lt;media&gt;`, `No such element.`]
        ], a: 0, src: `Sheet 1 (2025/26)` },
        { q: `Which of the following tags is used to create a text area in an HTML form?`, o: [
          [`&lt;textarea&gt; &lt;/textarea&gt;`, `Correct. Multi-line text input.`],
          [`&lt;text&gt;&lt;/text&gt;`, `No such element.`],
          [`&lt;input type="text" /&gt;`, `Single-line only.`],
          [`&lt;input type="textarea" /&gt;`, `Not an input type.`]
        ], a: 0, src: `Sheet 1 (2025/26)` },
        { q: `Which tag is used to create a dropdown in an HTML form?`, o: [
          [`&lt;input&gt;`, `Not a dropdown.`],
          [`&lt;select&gt;`, `Correct. With &lt;option&gt; children.`],
          [`&lt;text&gt;`, `No such element.`],
          [`&lt;textarea&gt;`, `Multi-line text.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `Which HTML element is used for YouTube videos?`, o: [
          [`&lt;samp&gt;`, `Sample output text.`],
          [`&lt;small&gt;`, `Smaller text.`],
          [`&lt;frame&gt;`, `Obsolete frameset element.`],
          [`&lt;iframe&gt;`, `Correct. YouTube embeds use an inline frame.`]
        ], a: 3, src: `Sheet 1 (2025/26)` },
        { q: `Which attribute is not essential under &lt;iframe&gt;?`, o: [
          [`frameborder`, `Correct. Border is optional (and obsolete; use CSS border).`],
          [`width`, `Commonly set to size the frame.`],
          [`height`, `Commonly set to size the frame.`],
          [`src`, `Needed to load the document.`]
        ], a: 0, src: `Sheet 1 (2025/26)` },
        { q: `In HTML, the copyright symbol can be included by _________`, o: [
          [`&amp;gt`, `Greater-than sign.`],
          [`&amp;amp`, `Ampersand.`],
          [`&amp;lt`, `Less-than sign.`],
          [`&amp;copy`, `Correct. &amp;copy; gives &copy;.`]
        ], a: 3, src: `Sheet 1 (2025/26)` },
        { q: `Which of the following HTML elements is used for canvas graphics?`, o: [
          [`&lt;css&gt;`, `No such element.`],
          [`&lt;paint&gt;`, `No such element.`],
          [`&lt;canvas&gt;`, `Correct (a block-level element).`],
          [`&lt;graphic&gt;`, `No such element.`]
        ], a: 2, src: `Sheet 1 (2025/26)` },
        { q: `What is the work of the &lt;address&gt; element in HTML5?`, o: [
          [`contains IP address`, `Not its purpose.`],
          [`contains home address`, `Too narrow.`],
          [`contains url`, `Not its purpose.`],
          [`contains contact details for author`, `Correct.`]
        ], a: 3, src: `Sheet 1 (2025/26)` },
        { q: `Which attribute specifies a unique alphanumeric identifier to be associated with an element?`, o: [
          [`type`, `Sets the kind of input.`],
          [`article`, `An element, not an attribute.`],
          [`id`, `Correct. ids are unique in the page.`],
          [`class`, `Can be shared by many elements.`]
        ], a: 2, src: `Sheet 1 (2025/26)` },
        { q: `What is the default type of the 'type' attribute of the &lt;input&gt; element?`, o: [
          [`Text`, `Correct.`],
          [`Password`, `Must be set explicitly.`],
          [`Numerals`, `Not the default.`],
          [`Special Characters`, `Not a type.`]
        ], a: 0, src: `Sheet 1 (2025/26)` },
        { q: `Which input type defines the file-select field?`, o: [
          [`file`, `Correct. &lt;input type="file"&gt;.`],
          [`checkbox`, `Multiple choice.`],
          [`button`, `Clickable button.`],
          [`text`, `Text field.`]
        ], a: 0, src: `Sheet 1 (2025/26)` },
        { q: `How does the image input type work?`, o: [
          [`Sets an image background`, `That is CSS background-image.`],
          [`Sets an image as a submit button`, `Correct. &lt;input type="image" src="..."&gt; submits the form.`],
          [`Sets an image anywhere on the page`, `That is &lt;img&gt;.`],
          [`Brings a default image to the page`, `Not its function.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `The month input type defines ___________`, o: [
          [`only the month`, `It also includes the year.`],
          [`month and year`, `Correct.`],
          [`date`, `That is type="date".`],
          [`date and time`, `That is datetime-local.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `Which element is used to create multi-line text input?`, o: [
          [`text`, `Single line.`],
          [`textarea`, `Correct.`],
          [`submit`, `A button.`],
          [`radio button`, `A choice.`]
        ], a: 1, src: `Sheet 1 (2025/26)` },
        { q: `Which attribute is NOT used with the radio input type?`, o: [
          [`name`, `Groups radio buttons.`],
          [`value`, `The value sent.`],
          [`checked`, `Pre-selects a radio.`],
          [`selected`, `Correct. selected belongs to &lt;option&gt; in a &lt;select&gt;.`]
        ], a: 3, src: `Sheet 1 (2025/26)` },
        { q: `Which attribute lets a &lt;select&gt; element accept several choices?`, o: [
          [`multiple`, `Correct.`],
          [`selected`, `Pre-selects one option.`],
          [`name`, `Names the field.`],
          [`value`, `Value of an option.`]
        ], a: 0, src: `Sheet 1 (2025/26)` },
        { q: `To make a link open inside an iframe, the link's target must equal the iframe's:`, o: [
          [`src`, `src is the initial page.`],
          [`id`, `The lecture uses the name attribute.`],
          [`name`, `Correct. target="iframe_a" with &lt;iframe name="iframe_a"&gt;.`],
          [`title`, `title is for accessibility.`]
        ], a: 2, src: `Lecture 6 example` },
        { q: `Which statement about XHTML is correct?`, o: [
          [`&lt;br&gt; is valid XHTML`, `Empty elements must be closed: &lt;br /&gt;.`],
          [`Attribute values must always be quoted`, `Correct. One of the 8 differences in L6.`],
          [`&lt;BODY&gt; in uppercase is allowed`, `Elements must be lowercase.`],
          [`The DOCTYPE is optional`, `It is mandatory in XHTML.`]
        ], a: 1, src: `Lecture 6 example` }
      ]
    },
    /* ───────────────────────── LECTURE 7 ───────────────────────── */
    {
      n: 7, title: `JavaScript (P1): Introduction, Variables and Output`,
      notes: [
        { h: `How HTML, CSS and JS fit together`, table: [
          [`Layer`, `Technology`, `Role`],
          [`Content layer`, `HTML`, `Gives the page structure and adds semantics`],
          [`Presentation layer`, `CSS`, `Rules stating how the HTML content is presented`],
          [`Behavior layer`, `JavaScript`, `Controls how the page behaves, adding interactivity`]
        ]},
        { h: `History`, pts: [
          `JavaScript was introduced as part of the <b>Netscape 2.0</b> browser. Microsoft released its own version called <b>JScript</b>.`,
          `<b>ECMA</b> developed a standard language known as <b>ECMAScript</b>; <b>ECMAScript Edition 6 (ES6)</b> is widely supported and is what is commonly called "JavaScript".`,
          `<b>JavaScript = ECMAScript + DOM API</b> (language specification + communication with HTML). Timeline: JavaScript 1.0, ES1, ES2, ES3, AJAX, jQuery, ES5, ES6, ES7.`,
          `JavaScript is the world's most popular programming language and the <b>programming language of the Web</b>; used in games, desktop and mobile applications. It is usually classed as an <b>object-oriented</b> (prototype-based) language.`
        ]},
        { h: `Advantages of JavaScript`, pts: [
          `<b>Less server interaction</b>: validate user input before sending the page to the server; saves server traffic, less load on the server.`,
          `<b>Immediate feedback to the visitors</b>: no waiting for a page reload to see if they forgot to enter something.`,
          `<b>Increased interactivity</b>: interfaces that react when the user hovers with the mouse or activates them via the keyboard.`,
          `<b>Richer interfaces</b>: drag-and-drop components and sliders give a rich interface.`
        ]},
        { h: `Limitations and characteristics`, pts: [
          `JavaScript cannot be treated as a full-fledged programming language. It lacks: (1) client-side JS <b>does not allow reading or writing of files</b> (kept for security reasons); (2) it <b>cannot be used for networking applications</b> (no such support); (3) it has <b>no multithreading or multiprocessor capabilities</b>.`,
          `It is a <b>lightweight, interpreted</b> language that builds interactivity into otherwise static HTML pages.`,
          `JavaScript <b>does not need to be compiled</b>; it is <b>interpreted</b>. A JS interpreter is software running inside the browser that reads and executes JavaScript.`
        ]},
        { h: `Embedding JS in HTML`, pts: [
          `Use the <code>&lt;script&gt;</code> tag in the <code>&lt;head&gt;</code> or <code>&lt;body&gt;</code>.`,
          `<b>Functions and code that may execute multiple times</b> go in the <b>&lt;head&gt;</b>; they are only interpreted when the function or event-handler is called.`,
          `<b>Code executed only once</b>, when the document is first loaded, goes in the <b>&lt;body&gt;</b>.`,
          `JS can be in a separate <b>external file (.js)</b>, included with the <b>src</b> attribute: <code>&lt;script src="file.js"&gt;&lt;/script&gt;</code>.`,
          `Lab 7: three places: <b>inline</b> (<code>&lt;button onclick="alert('Hi')"&gt;</code>), <b>internal</b> (&lt;script&gt; block), <b>external</b> (.js file).`,
          `<code>&lt;noscript&gt;</code> content is displayed only by browsers that do not run JavaScript.`
        ]},
        { h: `Variables`, pts: [
          `Variables are containers for storing data values. They are <b>loosely typed</b>: the type is determined <b>dynamically</b> from the value stored; the <b>typeof</b> operator checks the type.`,
          `Declared with <b>var</b>, <b>let</b> or <b>const</b>. <b>var</b> has function/global scope; <b>let</b> and <b>const</b> have <b>block scope</b>; <b>const</b> declares a constant that cannot be reassigned. Declarations outside any function are <b>global</b>; inside a function they are <b>local</b>.`,
          `Declared but not initialized = <b>undefined</b>. (The slide says "used and not declared or initialized have value null"; in real JS reading an undeclared variable throws a <b>ReferenceError</b>.)`,
          `Names start with a <b>letter, $ or _</b>, followed by letters, $, _ or digits; <b>case sensitive</b>; cannot be a reserved word (so <code>_myVariable</code> is valid, <code>123variable</code> and <code>break</code> are not).`,
          `Types a variable can hold: String, Number, Undefined, Null, Objects (including arrays), Symbols, Functions (and Boolean, BigInt).`,
          `<b>typeof</b> results: <code>typeof "a"</code> = "string", <code>typeof 5</code> = "number", <code>typeof true</code> = "boolean", <code>typeof undefined</code> = "undefined", <code>typeof null</code> = "object", <code>typeof [1,2,3]</code> = "object", <code>typeof NaN</code> = "number", <code>typeof function(){}</code> = "function", <code>typeof typeof 1</code> = "string".`
        ]},
        { h: `Expressions and comments`, pts: [
          `If the operator is <b>+</b> and one operand is a <b>string</b>, + becomes <b>string concatenation</b> and the other operand is coerced to string: <code>5 + "9"</code> = "59".`,
          `Comments: <code>// single-line</code> and <code>/* multi-line */</code> (identical to Java). Recall: HTML <code>&lt;!-- --&gt;</code>; CSS/JS <code>/* */</code>.`
        ]},
        { h: `Four ways to output`, table: [
          [`Method`, `Where it writes`],
          [`innerHTML`, `Into an HTML element: document.getElementById("demo").innerHTML = "Hello";`],
          [`document.write()`, `Into the HTML output. Used after the page has loaded (e.g. from a button) it deletes all existing HTML because document.open() is called automatically.`],
          [`window.alert() / alert()`, `Into an alert box`],
          [`console.log()`, `Into the browser console (Inspect, Console tab)`]
        ]},
        { h: `Example: input validation (Example 5)`, code: `<p>Please input a number between 1 and 10:</p>
<input id="numb" type="number">
<button type="button" onclick="myFunction()">Submit</button>
<p id="demo"></p>
<script>
function myFunction() {
  var x, text;
  x = document.getElementById("numb").value;   // value is a string
  if (isNaN(x) || x < 1 || x > 10) {           // not a number or out of range
    text = "Input not valid";
  } else {
    text = "Input OK";
  }
  document.getElementById("demo").innerHTML = text;
}
</script>` },
        { h: `Accessing elements (DOM, Lab 8)`, pts: [
          `The <b>DOM</b> (Document Object Model) is a W3C standard; the HTML DOM defines HTML elements as <b>objects</b>, their <b>properties</b>, <b>methods</b> to access them, and <b>events</b>. Parts: Core DOM, XML DOM, HTML DOM.`,
          `Access methods: <code>document.getElementById("id")</code>, <code>document.getElementsByClassName("c")</code>, <code>document.getElementsByTagName("p")</code>, <code>document.querySelector("css")</code>.`,
          `Events can be attached with <code>element.addEventListener(event, function, useCapture)</code>.`
        ]}
      ],
      cards: [
        [`Behavior layer`, `JavaScript (HTML = content, CSS = presentation).`],
        [`JavaScript = ?`, `ECMAScript + DOM API.`],
        [`Browser that introduced JavaScript`, `Netscape 2.0 (Microsoft's version: JScript).`],
        [`4 advantages of JS`, `Less server interaction, immediate feedback, increased interactivity, richer interfaces.`],
        [`3 limitations of JS`, `No file read/write (security), no networking applications, no multithreading/multiprocessor.`],
        [`Is JS compiled?`, `No, it is interpreted by an interpreter inside the browser.`],
        [`Where to put functions called many times?`, `In the &lt;head&gt;.`],
        [`Where to put code run once at load?`, `In the &lt;body&gt;.`],
        [`Include an external JS file`, `&lt;script src="file.js"&gt;&lt;/script&gt;`],
        [`Loose typing`, `JS determines the variable's type from the value stored.`],
        [`Declared but not initialized`, `Value is undefined.`],
        [`Valid variable name start`, `Letter, $ or _.`],
        [`Keyword for a constant`, `const.`],
        [`typeof null`, `"object".`],
        [`5 + "9"`, `"59" (string concatenation).`],
        [`4 output methods`, `innerHTML, document.write(), window.alert(), console.log().`],
        [`document.write() after page load`, `Deletes all existing HTML.`],
        [`&lt;noscript&gt;`, `Content shown by non-JavaScript browsers.`]
      ],
      qa: [
        [`Explain the advantages and limitations of the JavaScript language.`, `<b>Advantages</b>: (1) Less server interaction: input is validated before sending the page to the server, saving traffic and server load. (2) Immediate feedback to visitors without waiting for a page reload. (3) Increased interactivity: interfaces react to mouse hover or keyboard. (4) Richer interfaces: drag-and-drop components and sliders.<br><b>Limitations</b>: it is not a full-fledged language: (1) client-side JS cannot read or write files (for security); (2) it cannot be used for networking applications; (3) it has no multithreading or multiprocessor capabilities. It is a lightweight, interpreted language for adding interactivity to static HTML pages.`],
        [`Explain the ways to embed JavaScript in an HTML page.`, `(1) Inline: in an event attribute, e.g. &lt;button onclick="alert('Hi')"&gt;. (2) Internal: inside &lt;script&gt;...&lt;/script&gt; in the &lt;head&gt; (functions and code that may run many times, interpreted when called) or in the &lt;body&gt; (code run once when the document loads). (3) External: a separate .js file included with &lt;script src="file.js"&gt;&lt;/script&gt;; good for reuse and caching.`],
        [`List and explain the four ways JavaScript can display output.`, `innerHTML writes into an HTML element (document.getElementById("demo").innerHTML = "Hello"); document.write() writes into the HTML output while loading (after loading it erases the page); window.alert() shows an alert box; console.log() writes into the browser console for debugging.`],
        [`Explain JavaScript variables: declaration, typing, scope and naming rules.`, `Variables are containers for data declared with var (global/function scope), let (block scope) or const (block scope, cannot be reassigned). JS is loosely typed: the type is decided dynamically by the stored value and can be checked with typeof. A declared but uninitialized variable is undefined. Declarations outside functions are global, inside functions local. Names begin with a letter, $ or _, may contain digits after that, are case sensitive and cannot be reserved words.`],
        [`Compare client-side scripting with server-side scripting.`, `Client-side scripts (JavaScript, VBScript) are executed by the browser on the user's computer after the page arrives; they react to user input, give fast responses, can be blocked by the user and cannot access the server's database or file system. Server-side scripts (PHP, JSP, ASP, ASP.NET, Ruby, Perl, Python) are executed by the web server to build the page before sending it; they access databases and server files, cannot be blocked or viewed by the user, and respond more slowly because processing is remote.`]
      ],
      quiz: [
        { q: `JavaScript is an _______ language?`, o: [
          [`Object-Oriented`, `Correct per the professor's MCQ sheet and student keys: JavaScript is an object-oriented (prototype-based) language.`],
          [`Object-Based`, `Some books call it object-based, but the course sheet's answer is Object-Oriented.`],
          [`Procedural`, `JS supports procedural style but is not classed as a procedural language.`],
          [`None of the above`, `A is the expected answer.`]
        ], a: 0, src: `Exam 2024/25, 2023/24 (May); JavaScript MCQ Sheet` },
        { q: `Which of the following methods can be used to display data in some form using JavaScript?`, o: [
          [`document.write()`, `Valid, but not the only one.`],
          [`console.log()`, `Valid, but not the only one.`],
          [`window.alert()`, `Valid, but not the only one.`],
          [`All of the above`, `Correct. All are JS output methods (plus innerHTML).`]
        ], a: 3, src: `Exam 2025/26, 2024/25, 2023/24` },
        { q: `Which of the following methods is used to access HTML elements using JavaScript?`, o: [
          [`getElementById()`, `Valid, but B is valid too.`],
          [`getElementsByClassName()`, `Valid, but A is valid too.`],
          [`Both A and B`, `Correct.`],
          [`None of the above`, `Both are DOM access methods.`]
        ], a: 2, src: `Exam 2024/25, 2023/24` },
        { q: `How can a datatype be declared to be a constant type?`, o: [
          [`const`, `Correct. Its value cannot be reassigned later.`],
          [`var`, `Declares a normal variable.`],
          [`let`, `Declares a block-scoped variable that can change.`],
          [`constant`, `Not a keyword.`]
        ], a: 0, src: `Exam 2024/25, 2023/24` },
        { q: `How do we write a comment in JavaScript?`, o: [
          [`/* */`, `Also valid in JS (multi-line), but the key's expected answer is the single-line form.`],
          [`//`, `Correct per the key: // single-line comment.`],
          [`#`, `PHP/Python style, not JS.`],
          [`$ $`, `Not a comment.`]
        ], a: 1, src: `Exam 2025/26, 2023/24; JavaScript MCQ Sheet` },
        { q: `Which of the following keywords is used to define a variable in JavaScript?`, o: [
          [`var`, `Valid, but let is too.`],
          [`let`, `Valid, but var is too.`],
          [`Both A and B`, `Correct.`],
          [`None of the above`, `Both work.`]
        ], a: 2, src: `JavaScript MCQ Sheet` },
        { q: `Upon encountering empty statements, what does the JavaScript interpreter do?`, o: [
          [`Throws an error`, `An empty statement ( ; ) is legal.`],
          [`Ignores the statements`, `Correct.`],
          [`Gives a warning`, `No warning is given.`],
          [`None of the above`, `B is correct.`]
        ], a: 1, src: `JavaScript MCQ Sheet` },
        { q: `What is the use of the &lt;noscript&gt; tag in JavaScript?`, o: [
          [`The contents are displayed by non-JS-based browsers.`, `Correct.`],
          [`Clears all the cookies and cache.`, `Not its function.`],
          [`Both A and B.`, `B is false.`],
          [`None of the above.`, `A is correct.`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `When an operand's value is NULL, the typeof returned by the unary operator is:`, o: [
          [`Boolean`, `No.`],
          [`Undefined`, `typeof undefined is "undefined", but typeof null is not.`],
          [`Object`, `Correct. typeof null === "object" (a historic quirk).`],
          [`Integer`, `JS has no integer type name.`]
        ], a: 2, src: `JavaScript MCQ Sheet` },
        { q: `What does the JavaScript "debugger" statement do?`, o: [
          [`It will debug all the errors in the program at runtime.`, `It does not fix errors.`],
          [`It acts as a breakpoint in a program.`, `Correct. Execution pauses there when dev tools are open.`],
          [`It will debug the error in the current statement if any.`, `No automatic debugging.`],
          [`All of the above.`, `Only B is true.`]
        ], a: 1, src: `JavaScript MCQ Sheet` },
        { q: `Which of the following is not a JavaScript framework?`, o: [
          [`Node`, `Node.js is a JS runtime.`],
          [`Vue`, `JS framework.`],
          [`React`, `JS library/framework.`],
          [`Cassandra`, `Correct. Cassandra is a NoSQL database.`]
        ], a: 3, src: `JavaScript MCQ Sheet` },
        { q: `Which of the following is a valid JavaScript variable name?`, o: [
          [`123variable`, `Cannot start with a digit.`],
          [`_myVariable`, `Correct. May start with a letter, $ or _.`],
          [`var`, `Reserved word.`],
          [`break`, `Reserved word.`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `What is the data type of null in JavaScript?`, o: [
          [`Object`, `Correct as expected answer: typeof null returns "object" (the language spec calls the type Null).`],
          [`Null`, `The spec type is Null, but typeof reports "object", which is what this MCQ tests.`],
          [`Undefined`, `undefined is a different value/type.`],
          [`Null is not a valid data type in JavaScript`, `Null is a valid primitive.`]
        ], a: 0, src: `Exam 2022/23 Summer` },
        { q: `What is the result of typeof [1, 2, 3] in JavaScript?`, o: [
          [`Array`, `typeof never returns "array" (use Array.isArray).`],
          [`Object`, `Correct. Arrays are objects.`],
          [`List`, `No such type.`],
          [`Undefined`, `It is defined.`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `What is the result of typeof true in JavaScript?`, o: [
          [`True`, `That is the value, not its type.`],
          [`Boolean`, `Correct ("boolean").`],
          [`Object`, `Primitives are not objects.`],
          [`Undefined`, `No.`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `The output of <code>console.log(typeof NaN);</code> is`, o: [
          [`NaN`, `typeof returns a type name.`],
          [`number`, `Correct. NaN is of type number.`],
          [`null`, `No.`],
          [`undefined`, `No.`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `The output of <code>console.log(typeof typeof 1);</code> is`, o: [
          [`String`, `Correct. typeof 1 is "number", a string, so typeof "number" is "string".`],
          [`Number`, `That is typeof 1 only.`],
          [`1`, `No.`],
          [`True`, `No.`]
        ], a: 0, src: `Exam 2022/23 Summer` },
        { q: `Using document.write() after an HTML document is fully loaded will:`, o: [
          [`Append text at the end of the page`, `It does not append after loading.`],
          [`Delete all existing HTML`, `Correct. document.open() is called automatically on the closed document (Example 4).`],
          [`Write to the console`, `That is console.log().`],
          [`Throw an error`, `No error is thrown.`]
        ], a: 1, src: `Lecture 7 example` },
        { q: `In Example 5, the user types 15 and clicks Submit. What is shown in #demo?`, o: [
          [`Input OK`, `15 &gt; 10, so the condition is true.`],
          [`Input not valid`, `Correct. x &gt; 10 makes the if-condition true.`],
          [`15`, `The paragraph shows text, not the number.`],
          [`Nothing`, `innerHTML is always set.`]
        ], a: 1, src: `Lecture 7 example` }
      ]
    },
    /* ───────────────────────── LECTURE 8 ───────────────────────── */
    {
      n: 8, title: `JavaScript (P2): Operators, Control Structures and Arrays`,
      notes: [
        { h: `Arithmetic operators (y = 4)`, table: [
          [`Operator`, `Example`, `Result x`],
          [`+ addition`, `x = y + 5`, `9`],
          [`+ with a string`, `x = y + "5"`, `"45"`],
          [`+ with strings`, `x = "Four" + y + "4"`, `"Four44"`],
          [`- subtraction`, `x = y - 2`, `2`],
          [`++ post-increment`, `x = y++`, `4 (y becomes 5 after)`],
          [`++ pre-increment`, `x = ++y`, `5`],
          [`-- post-decrement`, `x = y--`, `4`],
          [`-- pre-decrement`, `x = --y`, `3`],
          [`* multiplication`, `x = y * 4`, `16`],
          [`/ division`, `x = 10 / y`, `2.5`],
          [`% modulo`, `x = y % 3`, `1`]
        ]},
        { h: `Assignment operators (x = 10)`, table: [
          [`Operator`, `Example`, `Same as`, `Result`],
          [`=`, `x = 5`, `x = 5`, `5`],
          [`+=`, `x += 5`, `x = x + 5`, `15`],
          [`-=`, `x -= 5`, `x = x - 5`, `5`],
          [`*=`, `x *= 5`, `x = x * 5`, `50`],
          [`/=`, `x /= 5`, `x = x / 5`, `2`],
          [`%=`, `x %= 5`, `x = x % 5`, `0`]
        ]},
        { h: `Comparison and logical operators (x = 10, y = 5)`, table: [
          [`Operator`, `Example`, `Result`],
          [`== equal value`, `x == 8 / x == 10 / x == "10"`, `false / true / true`],
          [`=== equal value AND type`, `x === 10 / x === "10"`, `true / false`],
          [`!= not equal value`, `x != 5`, `true`],
          [`!== not equal value or type`, `x !== "10" / x !== 10`, `true / false`],
          [`&gt; &gt;= &lt; &lt;=`, `x &gt; 5, x &gt;= 10, x &lt; 5, x &lt;= 10`, `true, true, false, true`],
          [`&amp;&amp; and`, `(x == 10 &amp;&amp; y &gt; x)`, `false`],
          [`|| or`, `(x &gt;= 10 || y &gt; x)`, `true`],
          [`! not`, `!(x == y) / !(x &gt; y)`, `true / false`],
          [`Mix`, `(x &gt;= 10 &amp;&amp; y &lt; x || x == y)`, `true`],
          [`Mix`, `((x &lt; y || x &gt;= 10) &amp;&amp; y &gt;= 5)`, `true`],
          [`Mix`, `(!(x == y) &amp;&amp; y &gt;= 10)`, `false`]
        ]},
        { h: `Trace: L8 Example (1) (a = 33, b = 10, c = "Test")`, formula: [
          `a + b = 43;  a - b = 23;  a / b = 3.3;  a % b = 3`,
          `a + b + c = 43Test   (left to right: 33 + 10 = 43, then 43 + "Test" concatenates)`,
          `a = ++a  → a becomes 34;  then result = ++a → ++a = 35`,
          `b = --b  → b becomes 9;   then result = --b → --b = 8`,
          `L8 Example (2) with a = 10, b = 20: (a == b) false, (a < b) true, (a > b) false, (a != b) true, (a >= b) false, (a <= b) true`,
          `L8 Example (3) with a = true, b = false: (a && b) false, (a || b) true, !(a && b) true`
        ]},
        { h: `Control structures and loops`, pts: [
          `<b>if / else if / else</b>: Example 4 with <code>book = "maths"</code> prints <b>Maths Book</b>.`,
          `<b>switch</b>: compares with <b>strict equality (===)</b>, i.e. value and type. Each case ends with <b>break</b>, otherwise execution falls through; <b>default</b> runs when nothing matches. Example 5 (grade 'A'): "Entering switch block", "Good job", "Exiting switch block".`,
          `<b>while</b> (test first), <b>do...while</b> (body runs at least once, test after), <b>for</b> (init; condition; update), <b>for...in</b> (loops over the keys/indexes of an object or array), and <b>for...of</b> (loops over values).`,
          `Example 6: <code>for (let i = 0; i &lt; cars.length; i++) text += cars[i] + "&lt;br&gt;";</code> prints each car on its own line.`
        ]},
        { h: `Arrays`, pts: [
          `JS arrays are a more relaxed version of Java arrays: <b>size can change</b> and <b>data can be mixed</b>; indexes only (no arbitrary keys like PHP).`,
          `Creating: <code>new Array(1, 2, 3)</code> (several arguments = elements); <code>new Array(5)</code> (single numeric argument = <b>size</b>); literal <code>[1, 2, 3]</code> with square brackets.`,
          `<code>length</code> gives the number of elements.`
        ]},
        { h: `Array methods`, table: [
          [`Method`, `Does`, `Returns`],
          [`push(e1, e2)`, `Adds to the end`, `New length`],
          [`unshift(e1, e2)`, `Adds to the front`, `New length`],
          [`pop()`, `Removes the last element`, `That element`],
          [`shift()`, `Removes the first element`, `That element`],
          [`splice(i, n, e1..)`, `Removes n elements from index i and inserts e1..`, `Array of removed elements (changes the array)`],
          [`slice(start, end)`, `Copies from start up to (not including) end`, `New array (original unchanged)`],
          [`indexOf(v, from)`, `First index of v at or after from`, `Index or -1`],
          [`lastIndexOf(v, from)`, `Last index of v searching backwards from from (-1 = last element)`, `Index or -1`],
          [`includes(v, from)`, `Is v present from position from?`, `true / false`],
          [`concat(a, b)`, `Joins arrays/values`, `New array`],
          [`reverse()`, `Reverses in place`, `The array`],
          [`sort()`, `Sorts in place <b>as strings</b> by default ([33,2,8] → [2,33,8])`, `The array`],
          [`join(sep)`, `Joins elements into a string (default ",")`, `String`],
          [`forEach(f)`, `Calls f for each element`, `undefined`]
        ]},
        { h: `Trace: ArrayEx(7) (verified by running it)`, formula: [
          `nums = [3,5,7,9,11]; push(22,33) → 3,5,7,9,11,22,33`,
          `unshift(55,66) → 55,66,3,5,7,9,11,22,33`,
          `pop() removes 33; then 'pop:'+nums.pop() prints pop:22 → nums = 55,66,3,5,7,9,11`,
          `shift() → prints 55, nums = 66,3,5,7,9,11; shift() again → 66, nums = 3,5,7,9,11`,
          `slice(0,3) → 3,5,7 (nums unchanged); reverse() → 11,9,7,5,3`,
          `splice(0,1) → removes 11, nums = 9,7,5,3; splice(0,2,111,222) → removes 9,7, nums = 111,222,5,3`,
          `slice(0,3) → 111,222,5`,
          `x = [22,66,11,77,33,55,44]: indexOf(33,2) = 4; lastIndexOf(33,-1) = 4; includes(33,2) = true; includes(88,0) = false`,
          `x.concat(nums, y) with y = [99,77,88] → 22,66,11,77,33,55,44,111,222,5,3,99,77,88`,
          `x.sort() → 11,22,33,44,55,66,77; x.reverse() → 77,66,55,44,33,22,11; join() → 77,66,55,44,33,22,11; join('-') → 77-66-55-44-33-22-11`,
          `(The slide's own sample results are simplified and not all match a real run; trust the values above.)`
        ]},
        { h: `The Date object`, pts: [
          `Created with <code>new Date()</code> (current date and time), <code>new Date(milliseconds)</code> (ms since midnight 1/1/1970, e.g. 5000 = five seconds past midnight on 1/1/70, as returned by getTime()), <code>new Date(datestring)</code> (format accepted by Date.parse()), <code>new Date(year, month, date[, hour, minute, second, millisecond])</code>.`,
          `Getters: getFullYear(), getMonth() (0 to 11), getDate(), getDay(), getHours(), getMinutes(), getSeconds(), getTime().`
        ]}
      ],
      cards: [
        [`y = 4; x = y + "5"`, `"45"`],
        [`y = 4; x = "Four" + y + "4"`, `"Four44"`],
        [`y = 4; x = y++`, `x = 4 (then y = 5).`],
        [`y = 4; x = --y`, `x = 3.`],
        [`10 % 3`, `1`],
        [`x = 10; x %= 5`, `0`],
        [`== vs ===`, `== compares value only; === compares value and type.`],
        [`10 === "10"`, `false`],
        [`switch comparison`, `Strict (===): value and type.`],
        [`do...while`, `Body runs at least once; condition checked after.`],
        [`push / unshift`, `Add to end / front; return new length.`],
        [`pop / shift`, `Remove last / first; return the removed element.`],
        [`slice(2,4) of [1,2,3,4,5]`, `[3,4] (end index excluded).`],
        [`splice return value`, `Array of removed elements (array is modified).`],
        [`[33,2,8].sort()`, `[2,33,8] (string order by default).`],
        [`new Array(5)`, `An empty array of length 5.`],
        [`new Date(5000)`, `Five seconds past midnight on 1/1/1970.`],
        [`33 + 10 + "Test"`, `"43Test"`]
      ],
      qa: [
        [`Explain the JavaScript array methods push, unshift, pop, shift, splice and slice with examples.`, `With nums = [3,5,7,9,11]: <b>push(22,33)</b> adds to the end and returns the new length → [3,5,7,9,11,22,33]. <b>unshift(55,66)</b> adds to the front → [55,66,3,...]. <b>pop()</b> removes and returns the last element (33). <b>shift()</b> removes and returns the first (55). <b>splice(index, count, e1, ...)</b> removes count elements from index, inserts the new ones and returns the removed elements, e.g. splice(0,2,111,222). <b>slice(start, end)</b> returns a new array from start up to but not including end and leaves the original unchanged, e.g. [1,2,3,4,5].slice(2,4) = [3,4].`],
        [`Compare the == and === operators and the switch comparison.`, `== compares values after type conversion (10 == "10" is true). === compares value and type with no conversion (10 === "10" is false). != and !== are their negations. A switch statement compares the expression with each case using strict equality (===), so case '5' does not match the number 5.`],
        [`Write a JavaScript program that prints all prime numbers between 0 and 50.`, `<pre>for (let n = 2; n &lt;= 50; n++) {
  let prime = true;
  for (let d = 2; d * d &lt;= n; d++) {
    if (n % d == 0) { prime = false; break; }
  }
  if (prime) document.write(n + " ");
}
// 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47</pre>`],
        [`Write a JavaScript program to display the Fibonacci sequence using recursion.`, `<pre>function fib(n) {
  if (n &lt; 2) return n;          // fib(0)=0, fib(1)=1
  return fib(n - 1) + fib(n - 2);
}
let N = parseInt(prompt("How many terms?"));
let out = [];
for (let i = 0; i &lt; N; i++) out.push(fib(i));
document.write(out.join(", ")); // N=10: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34</pre>`],
        [`Explain the loop statements of JavaScript.`, `while (condition) {...} tests before each iteration and may run zero times; do {...} while (condition); runs the body at least once and tests after; for (init; condition; update) {...} is used when the number of iterations is known; for (key in object) {...} iterates over the property names (or array indexes); for (value of iterable) iterates over values. break exits a loop, continue skips to the next iteration.`]
      ],
      quiz: [
        { q: `What will be the output of the following code snippet?<pre>var a = true + true + true * 3;
print(a)</pre>`, o: [
          [`3`, `true*3 is 3, but the two other trues are added too.`],
          [`0`, `true converts to 1, not 0.`],
          [`Error`, `Booleans convert to numbers in arithmetic; no error.`],
          [`5`, `Correct. 1 + 1 + (1*3) = 5 (verified with node).`]
        ], a: 3, src: `Exam 2025/26; JavaScript MCQ Sheet` },
        { q: `What will be the output of the following code snippet?<pre>a = [1, 2, 3, 4, 5];
print(a.slice(2, 4));</pre>`, o: [
          [`3, 4`, `Correct. Indexes 2 and 3; the end index 4 is excluded.`],
          [`2, 3`, `Those are values at indexes 1 and 2.`],
          [`3, 4, 5`, `The end index is not included.`],
          [`2, 3, 4`, `Wrong start and end.`]
        ], a: 0, src: `Exam 2025/26, 2023/24` },
        { q: `What will be the output of the following code snippet?<pre>function solve(arr, rotations) {
  if (rotations == 0) return arr;
  for (let i = 0; i &lt; rotations; i++) {
    let element = arr.pop();
    arr.unshift(element);
  }
  return arr;
}
// solve([44, 1, 22, 111], 5);</pre>`, o: [
          [`[111, 44, 1, 22]`, `Correct. 5 right-rotations of 4 elements = 1 rotation. (Options A and C are printed identically on the paper; the call is also commented out, so strictly nothing prints.)`],
          [`[44, 1, 22, 111]`, `That would be 4 (or 0) rotations.`],
          [`[111, 44, 1, 22] (duplicate)`, `Same as A on the paper; pick A.`],
          [`[1, 22, 111, 44]`, `That is a left rotation.`]
        ], a: 0, src: `Exam 2023/24; JavaScript MCQ Sheet` },
        { q: `What will be the output of the following code snippet?<pre>a = 5 + "9";
document.write(a);</pre>`, o: [
          [`Compilation Error`, `JS is interpreted and this is valid.`],
          [`14`, `+ with a string concatenates.`],
          [`Runtime Error`, `No error.`],
          [`59`, `Correct. 5 is converted to "5" and joined with "9".`]
        ], a: 3, src: `JavaScript MCQ Sheet` },
        { q: `When the switch statement matches the expression with the given labels, how is the comparison done?`, o: [
          [`Both the datatype and the result of the expression are compared.`, `Correct. switch uses === (strict comparison).`],
          [`Only the datatype of the expression is compared.`, `Values are compared too.`],
          [`Only the value of the expression is compared.`, `That would be ==.`],
          [`None of the above.`, `A is correct.`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `What will be the output of the following code snippet?<pre>var a = 1;
var b = 0;
while (a &lt;= 3) {
  a++;
  b += a * 2;
  print(b);
}</pre>`, o: [
          [`4 10 18`, `Correct. a=2: b=4; a=3: b=4+6=10; a=4: b=10+8=18 (then a&lt;=3 fails).`],
          [`1 2 3`, `Those are not the values of b.`],
          [`1 4 7`, `Wrong arithmetic.`],
          [`None of the above`, `A is correct.`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `What will be the output of the following code snippet?<pre>let sum = 0;
const a = [1, 2, 3];
a.forEach(getSum);
print(sum);
function getSum(ele) { sum += ele; }</pre>`, o: [
          [`6`, `Correct. forEach adds 1+2+3 (the function is hoisted, so it exists before use).`],
          [`1`, `All elements are added.`],
          [`2`, `All elements are added.`],
          [`None of the above`, `A is correct.`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `What will be the output of this binary search?<pre>let a = [1, 2, 3, 4, 5, 6];
var left = 0, right = 5, found = false, target = 5;
while (left &lt;= right) {
  var mid = Math.floor((left + right) / 2);
  if (a[mid] == target) { found = true; break; }
  else if (a[mid] &lt; target) left = mid + 1;
  else right = mid - 1;
}
print(found ? "YES" : "NO");</pre>`, o: [
          [`YES`, `Correct. mid=2 (3&lt;5) → left=3; mid=4 → a[4]=5 found.`],
          [`NO`, `5 is in the array.`],
          [`Syntax Error`, `The code is valid.`],
          [`None of the above`, `A is correct.`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `What will be the output?<pre>let s = "00000001111111";
let l = 0, r = s.length - 1, ans = -1;
while (l &lt;= r) {
  var mid = Math.floor((l + r) / 2);
  if (s[mid] == '1') { ans = mid; r = mid - 1; }
  else { l = mid + 1; }
}
print(ans);</pre>`, o: [
          [`8`, `Index 7 is already '1'.`],
          [`7`, `Correct. Binary search for the first '1' (seven zeros at indexes 0-6).`],
          [`0`, `Index 0 is '0'.`],
          [`1`, `Index 1 is '0'.`]
        ], a: 1, src: `JavaScript MCQ Sheet` },
        { q: `What will be the output?<pre>let n = 24;
let l = 0, r = 100, ans = n;
while (l &lt;= r) {
  let mid = Math.floor((l + r) / 2);
  if (mid * mid &lt;= n) { ans = mid; l = mid + 1; }
  else { r = mid - 1; }
}
print(ans);</pre>`, o: [
          [`5`, `25 &gt; 24.`],
          [`4`, `Correct. Floor of the square root of 24.`],
          [`6`, `36 &gt; 24.`],
          [`3`, `4*4 = 16 &lt;= 24, so a larger answer exists.`]
        ], a: 1, src: `JavaScript MCQ Sheet` },
        { q: `Which of the following is a valid way to concatenate two strings in JavaScript?`, o: [
          [`str1 + str2`, `Valid, but B is valid too.`],
          [`str1.concat(str2)`, `Valid, but A is valid too.`],
          [`Both a) and b)`, `Correct.`],
          [`Neither a) nor b)`, `Both work.`]
        ], a: 2, src: `Exam 2022/23 Summer` },
        { q: `The output of <code>console.log(1 + "2" + "2");</code> is?`, o: [
          [`122`, `Correct. 1 + "2" = "12", then "12" + "2" = "122".`],
          [`5`, `+ with strings concatenates.`],
          [`NaN`, `No subtraction is involved.`],
          [`Error`, `Valid code.`]
        ], a: 0, src: `Exam 2022/23 Summer` },
        { q: `What is the output of this code?<pre>const numbers = [33, 2, 8];
numbers.sort();
console.log(numbers[1]);</pre>`, o: [
          [`33`, `Correct. sort() compares as strings: "2" &lt; "33" &lt; "8", so the array is [2, 33, 8] (verified with node).`],
          [`2`, `2 is at index 0.`],
          [`8`, `8 is last in string order.`],
          [`1`, `Not in the array.`]
        ], a: 0, src: `Exam 2022/23 Summer` },
        { q: `What is the data type of the result of a mathematical operation between a number and a string in JavaScript?`, o: [
          [`Number`, `Only for -, *, / (e.g. "6" - 2 = 4); the expected answer follows the + case.`],
          [`String`, `Correct (expected). With + the number is converted and concatenated, e.g. 5 + "9" = "59".`],
          [`NaN`, `NaN is a value of type number, not a type.`],
          [`Error`, `JS converts types instead of failing.`]
        ], a: 1, src: `Exam 2022/23 Summer` },
        { q: `y = 4. What is x after <code>x = "Four" + y + "4"</code>?`, o: [
          [`"Four8"`, `Evaluation is left to right; "Four" + 4 is already a string.`],
          [`"Four44"`, `Correct (L8 table).`],
          [`12`, `"Four" is not numeric.`],
          [`NaN`, `+ concatenates, it does not produce NaN.`]
        ], a: 1, src: `Lecture 8 example` },
        { q: `With a = 33, b = 10, c = "Test", what does <code>document.write(a + b + c)</code> print?`, o: [
          [`3310Test`, `a + b is computed first as numbers.`],
          [`43Test`, `Correct. 33 + 10 = 43, then 43 + "Test".`],
          [`Test43`, `Order is left to right.`],
          [`NaN`, `No NaN here.`]
        ], a: 1, src: `Lecture 8 example` },
        { q: `In L8 Example (1), after <code>a = ++a;</code> (a was 33) the code runs <code>result = ++a;</code>. What is printed for "++a = "?`, o: [
          [`33`, `a was incremented twice.`],
          [`34`, `That is after the first increment only.`],
          [`35`, `Correct. a = ++a makes 34, then ++a gives 35 (verified with node).`],
          [`36`, `Only two increments happen.`]
        ], a: 2, src: `Lecture 8 example` },
        { q: `x = [22,66,11,77,33,55,44]. What is <code>x.indexOf(33, 2)</code>?`, o: [
          [`2`, `2 is the start position, not the result.`],
          [`3`, `Index 3 holds 77.`],
          [`4`, `Correct. 33 is at index 4.`],
          [`-1`, `33 is present after index 2.`]
        ], a: 2, src: `Lecture 8 example` },
        { q: `nums = [111, 222, 5, 3]. What does <code>nums.splice(0, 2, 7, 8)</code> return?`, o: [
          [`[7, 8, 5, 3]`, `That is the array after the call.`],
          [`[111, 222]`, `Correct. splice returns the removed elements.`],
          [`2`, `It returns an array, not a count.`],
          [`[5, 3]`, `Those remain in the array.`]
        ], a: 1, src: `Lecture 8 example` }
      ]
    },
    /* ───────────────────────── LECTURE 9 ───────────────────────── */
    {
      n: 9, title: `JavaScript (P3): Strings, Objects, Math, Functions, Events, Storage`,
      notes: [
        { h: `Strings`, pts: [
          `Strings use <code>" "</code> or <code>' '</code>. <b>length</b> is a <b>property</b> (not a method as in Java): <code>"Connie Client".length</code> = 13.`,
          `There is <b>no char type</b>: <b>charAt(i)</b> returns a one-letter String; <b>charCodeAt(i)</b> returns the Unicode (ASCII) code of the character.`,
          `Concatenation with +: <code>1 + 1</code> is 2, but <code>"1" + 1</code> is "11".`,
          `<b>split(delim)</b> breaks a string into an array (can use regular expressions); <b>join(delim)</b> merges an array into a string: <code>"the quick brown fox".split(" ")</code> → reverse → join("!") = "fox!brown!quick!the".`,
          `Other methods: indexOf, lastIndexOf, search, replace, substring, substr, toLowerCase, toUpperCase, trim.`
        ]},
        { h: `String search and extraction`, table: [
          [`Method`, `Example`, `Result`],
          [`indexOf(v)`, `"Please locate where 'locate' occurs!".indexOf("locate")`, `7 (first occurrence, -1 if none)`],
          [`lastIndexOf(v)`, `same string .lastIndexOf("John")`, `-1 (not found); lastIndexOf("locate") = 21`],
          [`search(v)`, `same string .search("locate")`, `7 (works with regular expressions)`],
          [`substring(start, end)`, `"Apple, Banana, Kiwi".substring(6, 13)`, `" Banana" (index 6 is the space; end 13 excluded)`],
          [`substr(start, count)`, `"Apple, Banana,Kiwi".substr(6, 10)`, `" Banana,Ki" (10 characters from index 6)`],
          [`substring(0, s.indexOf(" "))`, `"Connie Client"`, `"Connie"`],
          [`"Scaler".substring(2, 4)`, `characters at 2 and 3`, `"al"`]
        ]},
        { h: `Data type conversions`, pts: [
          `String to number: (1) unary <b>+</b>: <code>+'27'</code> → 27; (2) <b>Number(x)</b>; (3) <b>parseInt(x)</b>: <code>parseInt("123")</code> → 123, <code>parseInt(7.5)</code> → 7, <code>parseInt("123Hello")</code> → 123, <code>parseInt("Hello123")</code> → NaN; (4) <b>parseFloat(x)</b>: <code>parseFloat("12.75")</code> → 12.75; (5) <b>isNaN(x)</b> → true/false.`,
          `Number to string: <b>String(x)</b> (the slide writes "string(x)"; JS is case sensitive so it must be String) and <b>x.toString()</b>; literal form needs two dots: <code>999..toString()</code>.`,
          `Any type to string and back: <b>JSON.stringify(x)</b> returns a string (serialization); <b>JSON.parse(x)</b> returns the original type.`,
          `L9 Example 1 output: <code>typeof +x</code> → number; <code>Number('23')</code> → 23 number; parseInt(7.5) → 7; parseFloat(7.5) → 7.5; isNaN(289) → false; String(289) → "289" string; num.toString() → "289" string; 999..toString() → "999" string; typeof obj → object; typeof JSON.stringify(obj) → string; typeof JSON.parse(JSON.stringify(obj)) → object.`
        ]},
        { h: `Objects`, pts: [
          `Object literal: <code>var S1 = { name: "Ali", age: 20, getName: function(){ return this.name; } };</code>. Access a property with <code>objectName.property</code> or <code>objectName["property"]</code>; call a method with <code>objectName.methodName()</code>.`,
          `<b>this</b> refers to the object the method is called on. <b>delete</b> removes a property: <code>delete S1.age</code>.`,
          `<b>Object.create(proto, descriptors)</b> creates a new object whose prototype is proto: <code>let S2 = Object.create(S1, {class:{value:1}});</code> (S2 inherits name, age, getName; the descriptor property "class" is non-enumerable).`,
          `<b>Object.assign(target, src1, src2...)</b> copies the values and (own, enumerable) properties from sources into the target and returns the target; used to merge objects: <code>Object.assign(S1, S2, {status:'m'})</code>.`,
          `Objects are compared <b>by reference</b>: two objects with the same content are not === equal. Duplicate keys in a literal keep the <b>last</b> value. The <b>in</b> keyword checks whether a property exists: <code>"name" in S1</code>.`
        ]},
        { h: `Math object`, table: [
          [`Method / property`, `Meaning`],
          [`abs(x)`, `Absolute value`],
          [`ceil(x)`, `Smallest integer not less than x (round up)`],
          [`floor(x)`, `Largest integer not greater than x (round down)`],
          [`round(x)`, `Closest integer`],
          [`max(x, y) / min(x, y)`, `Larger / smaller value; Math.max() with no args = -Infinity, Math.min() = Infinity`],
          [`pow(x, y)`, `x raised to the power y`],
          [`sqrt(x)`, `Square root`],
          [`exp(x), log(x)`, `e<sup>x</sup>, natural logarithm`],
          [`sin, cos, tan`, `Trigonometry (x in radians)`],
          [`random()`, `Random number in [0, 1): Math.floor(Math.random() * 10 + 1) gives 1 to 10`],
          [`E, PI`, `Properties; Math.floor(Math.PI) = 3`]
        ]},
        { h: `Functions`, pts: [
          `A function is a block of code created once and executed as much as you want; functions <b>modularize</b> a program (divide-and-conquer). Variables declared inside are <b>local</b>.`,
          `<b>Built-in functions</b>: <b>escape</b> (encodes non-alphanumeric characters as %xx, a space becomes %20), <b>eval</b> (parses and executes a string as JS code, returns the value of the last statement: <code>eval("x+y")</code> = 20 for 12 and 8), <b>isFinite</b>, <b>isNaN</b>, <b>Number</b>, <b>parseFloat</b>, <b>parseInt</b>.`,
          `<b>Four types of user-defined functions</b>: (1) <b>Declaration</b> <code>function calc(x1, x2) { return x1 + x2; }</code>; (2) <b>Expression</b> <code>let calc = function(x1, x2) { ... };</code>; (3) <b>Self-invoked</b> <code>(function(){ let sum = 7 + 6; console.log('sum=' + sum); })();</code> runs immediately (prints sum=13); (4) <b>Arrow</b> <code>let calc = (x1, x2) =&gt; x1 + x2;</code>, one argument <code>let addten = x =&gt; x + 10;</code>, no argument <code>_ =&gt; {...}</code>.`,
          `<b>Default parameters</b>: <code>function calc(x = 0, y = 0)</code> → calc() = 0, calc(2, 4) = 6.`,
          `<b>Rest parameter</b> (pass any number of arguments as an array): <code>function calc(...A) { let sum = 0; for (let i = 0; i &lt; A.length; i++) sum += A[i]; return sum; }</code>. Careful: the slide's loop uses <code>i &lt;= A.length</code>, which adds A[A.length] = undefined and returns <b>NaN</b>.`,
          `<b>Closures</b>: an inner function keeps access to the variables of the outer function.`
        ]},
        { h: `Event-driven programming`, pts: [
          `Types of events: <b>User interface events</b> (onload, onfocus, onblur, onchange), <b>Mouse events</b> (click, dblclick, mouseenter, mouseleave, mousemove), <b>Keyboard events</b> (onkeydown, onkeypress, onkeyup).`,
          `<b>onload</b> (usually on &lt;body&gt;) waits until all page elements are loaded before running the script. <b>onclick</b> fires on a click; <b>ondblclick</b> on a double-click. <b>onkeyup</b> fires when the user releases a key (e.g. copy what is typed into a paragraph). <b>onunload</b> when the user leaves the page.`,
          `Others: onabort, onblur (loses focus), onchange (element changed), ondragdrop, onerror, onfocus, onkeydown, onkeypress, onmousedown, onmousemove, onmouseout, onmouseover, onmouseup, onmove, onreset, onresize, onselect, onsubmit.`
        ]},
        { h: `Events example`, code: `<body onload="init()">
<h2 ondblclick="alert('h2 double-clicked')">Double-click me</h2>
<button onclick="alert('button clicked')">Click me</button>
<input id="in" onkeyup="document.getElementById('res').innerHTML = this.value">
<p id="res"></p>
<h1 onmouseover="this.style.backgroundColor='red'"
    onmouseout="this.style.backgroundColor='blue'">Hover me</h1>
<script>
function init() { console.log("page loaded"); }
document.getElementById("in").addEventListener("keydown", function(e) {
  if ("aeiou".includes(e.key)) alert("vowel is pressed");
});
</script>
</body>` },
        { h: `localStorage and sessionStorage`, pts: [
          `<b>localStorage</b>: saves key/value pairs in the browser with <b>no expiration date</b> (survives closing the browser). <b>sessionStorage</b>: key/value pairs for <b>one session</b> only (kept while the browser/tab is open, including reloads).`,
          `Methods: <b>setItem("name", value)</b>, <b>getItem("name")</b>, <b>removeItem("name")</b>, <b>clear()</b>, <b>key(index)</b>; property <b>length</b>. Shorthand: <code>localStorage.name = value</code>, <code>value = localStorage.name</code>. Values are stored as <b>strings</b> (store objects with JSON.stringify).`,
          `In Chrome, data is in an SQLite file in the user profile (\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage); view it with Inspect &gt; Application &gt; Local Storage.`,
          `L9 Example 3 (change background color) saves the clicked color with <code>localStorage.setItem('color', color)</code>. Note the slide's bug: <code>localStorage.lenght</code> (misspelled) is undefined, so the saved color is never restored on reload; it should be <code>localStorage.length</code>.`
        ]}
      ],
      cards: [
        [`length of a string`, `A property: s.length (not s.length()).`],
        [`charAt vs charCodeAt`, `charAt returns a 1-letter string; charCodeAt returns its Unicode/ASCII code.`],
        [`"1" + 1`, `"11"`],
        [`split / join`, `split: string → array by delimiter; join: array → string with delimiter.`],
        [`substring(start, end)`, `From start up to but not including end.`],
        [`substr(start, count)`, `count characters from start.`],
        [`parseInt("123Hello") / parseInt("Hello123")`, `123 / NaN.`],
        [`JSON.stringify / JSON.parse`, `Object → JSON string (serialization) / string → object.`],
        [`Object.create(S1, ...)`, `New object with S1 as its prototype.`],
        [`Object.assign(t, s1, s2)`, `Copies own enumerable properties of sources into t and returns t.`],
        [`delete keyword`, `Removes a property from an object.`],
        [`Math.ceil(4.2) / Math.floor(4.8)`, `5 / 4.`],
        [`Math.max() with no arguments`, `-Infinity (Math.min() = Infinity).`],
        [`eval("12+8")`, `20.`],
        [`4 types of user-defined functions`, `Declaration, expression, self-invoked, arrow.`],
        [`Arrow function with one arg`, `let addten = x => x + 10;`],
        [`Three event types`, `User interface, mouse, keyboard.`],
        [`onkeyup`, `Fires when the user releases a key.`],
        [`localStorage vs sessionStorage`, `localStorage: no expiry; sessionStorage: one session only.`],
        [`localStorage methods`, `setItem, getItem, removeItem, clear, key.`]
      ],
      qa: [
        [`Explain the four types of user-defined functions in JavaScript with an example of each.`, `(1) <b>Declaration</b>: <code>function calc(x1, x2) { let sum = x1 + x2; return sum; }</code>, called as calc(8, 9). (2) <b>Expression</b>: the function is stored in a variable, <code>let calc = function(x1, x2) { return x1 + x2; };</code>. (3) <b>Self-invoked</b>: wrapped in parentheses and called immediately, <code>(function(){ let sum = 7 + 6; console.log('sum=' + sum); })();</code>. (4) <b>Arrow</b>: <code>let calc = (x1, x2) =&gt; x1 + x2;</code>, with one argument <code>x =&gt; x + 10</code> and no argument <code>_ =&gt; 6 + 5</code>. Functions can also use default parameters (x = 0) and rest parameters (...A).`],
        [`What do you mean by an event in JavaScript? Give examples of events with their handling.`, `An event is something that happens to an HTML element (caused by the user or the browser) to which JavaScript can react with a handler. Types: user interface events (onload, onfocus, onblur, onchange), mouse events (onclick, ondblclick, onmouseover, onmouseout, onmousemove) and keyboard events (onkeydown, onkeypress, onkeyup). Examples: <code>&lt;body onload="init()"&gt;</code> runs init after the page loads; <code>&lt;button onclick="alert('Hi')"&gt;</code>; <code>&lt;input onkeyup="show(this.value)"&gt;</code> copies text as the user types; <code>&lt;h1 onmouseover="this.style.color='red'" onmouseout="this.style.color='black'"&gt;</code>.`],
        [`Compare localStorage and sessionStorage and list the localStorage methods.`, `Both store key/value string pairs in the browser. localStorage keeps data with no expiration date, even after the browser is closed; sessionStorage keeps data only for one session (while the browser/tab is open, including reloads). Methods: setItem(key, value) adds, getItem(key) reads, removeItem(key) deletes one item, clear() deletes all, key(n) returns the n-th key; length gives the count. Shorthand: localStorage.name = value.`],
        [`Explain data type conversion in JavaScript.`, `String to number: unary + ('27' → 27), Number(x), parseInt(x) (integer part, stops at the first non-digit, NaN if it starts with a letter), parseFloat(x); isNaN(x) tests the result. Number to string: String(x) or x.toString() (999..toString()). Any value to a JSON string with JSON.stringify(x) and back with JSON.parse(x). Implicitly, + with a string converts the other operand to a string, while -, *, / convert strings to numbers.`],
        [`Explain how to create objects with a literal, Object.create and Object.assign.`, `A literal lists properties and methods: <code>var S1 = {name:"Ali", age:20, getName:function(){return this.name;}};</code> (this refers to the object). <code>Object.create(S1, {class:{value:1}})</code> makes a new object S2 whose prototype is S1, so S2 inherits name, age and getName and gets its own class property; assigning S2.name = "Ahmed" creates an own property. <code>Object.assign(S1, S2, {status:'M'})</code> copies the own enumerable properties of S2 and the third object into S1 and returns S1 (merging objects). delete removes a property.`]
      ],
      quiz: [
        { q: `What will be the output of the following code snippet?<pre>(function (a) {
  return (function () {
    console.log(a);
    a = 6;
  })()
})(21);</pre>`, o: [
          [`6`, `a is set to 6 only after it has been printed.`],
          [`NaN`, `a is a valid number.`],
          [`21`, `Correct. By closure, the inner function reads the outer a = 21 before changing it (verified with node).`],
          [`None of the above`, `C is correct.`]
        ], a: 2, src: `Exam 2024/25, 2023/24 (May); JavaScript MCQ Sheet` },
        { q: `Which function is used to serialize an object into a JSON string in JavaScript?`, o: [
          [`stringify()`, `Correct. JSON.stringify() converts an object to a JSON string.`],
          [`parse()`, `JSON.parse() does the reverse.`],
          [`convert()`, `Not a JSON method.`],
          [`None of the above`, `A is correct.`]
        ], a: 0, src: `Exam 2025/26, 2024/25, 2023/24` },
        { q: `What will be the output of the following code snippet?<pre>const example = ({ a, b, c }) =&gt; {
  console.log(a, b, c);
};
example(0, 1, 2);</pre>`, o: [
          [`0 1 2`, `The function destructures ONE object parameter; 0 is not an object with a, b, c.`],
          [`0 undefined undefined`, `a is read from the number 0's properties, not the number itself.`],
          [`undefined undefined undefined`, `Correct. Destructuring the number 0 finds no a, b, c properties (verified with node). The 2025/26 photo shows A ticked, which is wrong.`],
          [`None of the above`, `C is correct.`]
        ], a: 2, src: `Exam 2025/26; JavaScript MCQ Sheet` },
        { q: `What will be the output of the following code snippet?<pre>var a = "Scaler";
var result = a.substring(2, 4);
document.write(result);</pre>`, o: [
          [`al`, `Correct. Characters at indexes 2 and 3 (end excluded).`],
          [`ale`, `Index 4 is excluded.`],
          [`cal`, `Index 1 is not included.`],
          [`caler`, `That is substring(1).`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `What will be the output of the following code snippet?<pre>var x = 12;
var y = 8;
var res = eval("x+y");
document.write(res);</pre>`, o: [
          [`20`, `Correct. eval executes the string as code.`],
          [`x+y`, `eval evaluates the string instead of printing it.`],
          [`128`, `The values are numbers, so + adds.`],
          [`None of the above`, `A is correct.`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `What will be the output of the following code snippet?<pre>var a = Math.max();
var b = Math.min();
print(a);
print(b);</pre>`, o: [
          [`-Infinity Infinity`, `Correct. With no arguments max() returns -Infinity and min() returns Infinity.`],
          [`Infinity -Infinity`, `Reversed.`],
          [`Infinity Infinity`, `max() is -Infinity.`],
          [`-Infinity -Infinity`, `min() is Infinity.`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `What will be the output?<pre>var a = Math.max() &lt; Math.min();
var b = Math.max() &gt; Math.min();
print(a);
print(b);</pre>`, o: [
          [`true false`, `Correct. -Infinity &lt; Infinity.`],
          [`false true`, `Reversed.`],
          [`true true`, `Both cannot be true.`],
          [`false false`, `One of them is true.`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `What is the output of <code>print(NaN === NaN);</code>?`, o: [
          [`true`, `NaN is never equal to anything, including itself.`],
          [`false`, `Correct. Use isNaN() or Number.isNaN() to test for NaN.`],
          [`undefined`, `The comparison returns a boolean.`],
          [`Error`, `Valid code.`]
        ], a: 1, src: `JavaScript MCQ Sheet` },
        { q: `What will be the output of <code>print(parseInt("123Hello")); print(parseInt("Hello123"));</code>?`, o: [
          [`123 NaN`, `Correct. parseInt reads leading digits; a string starting with letters gives NaN.`],
          [`123Hello Hello123`, `parseInt returns numbers.`],
          [`NaN NaN`, `The first string starts with digits.`],
          [`123 123`, `The second starts with letters.`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `What will be the output?<pre>var a = "hello";
var sum = 0;
for (var i = 0; i &lt; a.length; i++) {
  sum += (a[i] - 'a');
}
print(sum);</pre>`, o: [
          [`47`, `Characters are not converted to their codes by -.`],
          [`NaN`, `Correct. "h" - "a" is NaN, and NaN poisons the sum (verified with node).`],
          [`0`, `No.`],
          [`None of the above`, `B is correct.`]
        ], a: 1, src: `JavaScript MCQ Sheet` },
        { q: `The process in which an object or data structure is translated into a format suitable for transferral over a network, or storage, is called?`, o: [
          [`Object Serialization`, `Correct (e.g. JSON.stringify).`],
          [`Object Encapsulation`, `Hiding internal state.`],
          [`Object Inheritance`, `Reusing a parent's members.`],
          [`None of the above`, `A is correct.`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `What will be the output?<pre>(function () {
  setTimeout(() =&gt; console.log(1), 2000);
  console.log(2);
  setTimeout(() =&gt; console.log(3), 0);
  console.log(4);
})();</pre>`, o: [
          [`1 2 3 4`, `Timers never run before the current code finishes.`],
          [`2 3 4 1`, `Even a 0 ms timer waits until the function ends.`],
          [`2 4 3 1`, `Correct. Synchronous logs first (2, 4), then the 0 ms timer (3), then after 2 s (1).`],
          [`4 3 2 1`, `2 is logged before 4.`]
        ], a: 2, src: `JavaScript MCQ Sheet` },
        { q: `What will be the output?<pre>const set = new Set();
set.add(5);
set.add('Hello');
set.add({ name: 'Scaler' });
for (let item of set) { console.log(item + 6); }</pre>`, o: [
          [`11 NaN NaN`, `+ with a string concatenates rather than giving NaN.`],
          [`11 NaN [object Object]`, `"Hello" + 6 = "Hello6".`],
          [`11 Hello6 [object Object]6`, `Correct (verified with node).`],
          [`None of the above`, `C is correct.`]
        ], a: 2, src: `JavaScript MCQ Sheet` },
        { q: `How are objects compared when they are checked with the strict equality operator?`, o: [
          [`The contents of the objects are compared`, `Contents are ignored.`],
          [`Their references are compared`, `Correct. Two distinct objects are never ===, even with equal contents.`],
          [`Both A and B`, `Only references.`],
          [`None of the above`, `B is correct.`]
        ], a: 1, src: `JavaScript MCQ Sheet` },
        { q: `What will be the output?<pre>function test(...args) {
  console.log(typeof args);
}
test(12);</pre>`, o: [
          [`NaN`, `typeof returns a type name.`],
          [`Number`, `args is the array of arguments, not 12.`],
          [`Object`, `Correct. Rest parameters form an array, and typeof an array is "object".`],
          [`Array`, `typeof never returns "array".`]
        ], a: 2, src: `JavaScript MCQ Sheet` },
        { q: `What will be the output?<pre>const obj1 = { first: 20, second: 30, first: 50 };
console.log(obj1);</pre>`, o: [
          [`{first: 20, second: 30}`, `The later duplicate overwrites.`],
          [`{first: 50, second: 30}`, `Correct. The last value of a duplicate key wins, keeping the first position.`],
          [`{first: 20, second: 30, first: 50}`, `Keys are unique.`],
          [`Syntax Error`, `Duplicate keys are allowed.`]
        ], a: 1, src: `JavaScript MCQ Sheet` },
        { q: `What happens when we run this code?<pre>function dog() {
  print("I am a dog.");
}
dog.sound = "Bark";</pre>`, o: [
          [`Syntax Error`, `Valid code.`],
          [`"I am a dog" gets printed`, `dog is never called.`],
          [`ReferenceError`, `dog is defined.`],
          [`Nothing happens`, `Correct. Functions are objects, so adding a property is fine; nothing is printed.`]
        ], a: 3, src: `JavaScript MCQ Sheet` },
        { q: `What keyword is used to check whether a given property is valid or not?`, o: [
          [`in`, `Correct. "name" in obj.`],
          [`is in`, `Not a keyword.`],
          [`exists`, `Not a keyword.`],
          [`lies`, `Not a keyword.`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `What does the … operator do in JS?`, o: [
          [`It is used to spread iterables to individual elements`, `Correct. The spread (and rest) operator.`],
          [`It is used to describe a datatype of undefined size`, `No.`],
          [`No such operator exists`, `It exists since ES6.`],
          [`None of the above`, `A is correct.`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `Which of the following are closures in JavaScript?`, o: [
          [`Variables`, `A closure is a function with its scope.`],
          [`Functions`, `Correct. Every function in JS creates a closure over its scope.`],
          [`Objects`, `No.`],
          [`All of the above`, `Only functions.`]
        ], a: 1, src: `JavaScript MCQ Sheet` },
        { q: `How to stop an interval timer in JavaScript?`, o: [
          [`clearInterval`, `Correct.`],
          [`clearTimer`, `Not a function.`],
          [`intervalOver`, `Not a function.`],
          [`None of the above`, `A is correct.`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `What keyword is used to declare an asynchronous function in JavaScript?`, o: [
          [`async`, `Correct.`],
          [`await`, `Used inside async functions.`],
          [`setTimeout`, `A timer function.`],
          [`None of the above`, `A is correct.`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `What does the toLocaleString() method do in JS?`, o: [
          [`Returns a localized object representation.`, `It returns a string.`],
          [`Returns a parsed string.`, `No parsing.`],
          [`Returns a localized string representation of an object.`, `Correct (the sheet misspells it "toLocateString").`],
          [`None of the above.`, `C is correct.`]
        ], a: 2, src: `JavaScript MCQ Sheet` },
        { q: `What will be shown in #example?<pre>&lt;p id="example"&gt;&lt;/p&gt;
&lt;script&gt;
function Func() {
  document.getElementById("example").innerHTML = Math.sqrt(81);
}
&lt;/script&gt;</pre>`, o: [
          [`9`, `Sheet's answer: what Func would write. Strictly, Func is never called, so the paragraph stays empty.`],
          [`81`, `sqrt(81) is 9.`],
          [`Error`, `No error.`],
          [`0`, `No.`]
        ], a: 0, src: `JavaScript MCQ Sheet` },
        { q: `Which of the following is a valid way to convert a string to a number in JavaScript?`, o: [
          [`parseInt("42")`, `Valid, but not the only one.`],
          [`Number("42")`, `Valid, but not the only one.`],
          [`parseFloat("42")`, `Valid, but not the only one.`],
          [`All of them`, `Correct.`]
        ], a: 3, src: `Exam 2022/23 Summer` },
        { q: `What is the result of <code>"Apple, Banana, Kiwi".substring(6, 13)</code>?`, o: [
          [`"Banana"`, `The slide says Banana, but index 6 is the space after the comma.`],
          [`" Banana"`, `Correct. Characters 6 to 12, starting with a space (verified with node).`],
          [`"Banana,"`, `Index 13 is excluded.`],
          [`" Banana, Kiwi"`, `That is substring(6).`]
        ], a: 1, src: `Lecture 9 example` }
      ]
    },
    /* ───────────────────────── LECTURE 10 ───────────────────────── */
    {
      n: 10, title: `PHP: Server-Side Basics`,
      notes: [
        { h: `URLs, web servers and server-side programming`, pts: [
          `When you type <code>http://server/path/file</code>: (1) your computer looks up the server's <b>IP address using DNS</b>; (2) the browser <b>connects to that IP</b> and requests the file; (3) the <b>web server software (e.g. Apache)</b> grabs the file from the server's local file system; (4) the server <b>sends back its contents</b>.`,
          `Some URLs specify <b>programs</b> the server should run and send back their <b>output</b>: <code>http://www.facebook.com/home.php</code> tells facebook.com to run home.php and return its output.`,
          `Architecture: browser → Web/Application server (Apache, WebSphere; Java Servlets, XML files) → Database.`,
          `Server-side pages are programs written in web languages/frameworks: <b>PHP, Java/JSP, Ruby on Rails, ASP.NET, Python, Perl</b>.`,
          `<b>Characteristics</b> (server-side scripting): (1) <b>dynamically edit, change or add</b> any content to a web page; (2) <b>respond to user queries</b> or data submitted from HTML forms; (3) <b>access any data or databases</b> and return the results to a browser; (4) <b>customize</b> a web page to make it more useful for individual users; (5) <b>provide security</b> since your server code cannot be viewed from a browser.`,
          `The <b>web server</b> contains software that allows it to run server-side programs and sends back their output as responses. Each language has pros and cons; the course uses PHP.`
        ]},
        { h: `What is PHP and why PHP?`, pts: [
          `<b>PHP</b> = "<b>PHP Hypertext Preprocessor</b>" (recursive acronym): an open-source <b>server-side scripting language</b> used to make pages <b>dynamic</b>: provide different content depending on context, interface with other services (<b>database, e-mail</b>), <b>authenticate users</b>, <b>process form information</b>. PHP code can be embedded in (X)HTML.`,
          `<b>Why PHP?</b> <b>Free and open source</b>; <b>Compatible</b> (as of November 2006 more than <b>19 million websites</b> used PHP); <b>Simple</b>.`,
          `Lifecycle of a PHP request: the browser requests Hello.php → the server runs the PHP code → only the resulting HTML ("Hello world!") is sent to the user's computer.`
        ]},
        { h: `Basic syntax, output, comments`, pts: [
          `Code between <code>&lt;?php</code> and <code>?&gt;</code> is executed as PHP; everything else is output as pure HTML. You can switch back and forth between HTML and PHP modes.`,
          `Output: <code>print "text";</code> or <code>echo "a", "b";</code>. Escape characters are the same as Java (<code>\\"</code>, <code>\\n</code>). Strings may span lines.`,
          `Comments: <code># single-line</code>, <code>// single-line</code>, <code>/* multi-line */</code> (like Java, but # is also allowed).`
        ]},
        { h: `Variables, types, constants`, pts: [
          `<code>$name = expression;</code>: names <b>always begin with $</b> on both declaration and use, are <b>case sensitive</b>, are <b>implicitly declared by assignment</b> (type not written); PHP is <b>loosely typed</b>.`,
          `Valid names: <code>$_hello</code>, <code>$hello3</code>. Invalid: <code>$3hello</code> (cannot start with a digit), <code>$this</code> (reserved), <code>$5_Hello</code>.`,
          `Basic types: <b>int, float, boolean, string, array, object, NULL</b>. Test with <b>is_type</b> functions (is_string, is_int, is_numeric...), <b>gettype()</b> returns the type as a string, <b>var_dump()</b> dumps type and value: <code>var_dump("Harry")</code> → <code>string(5) "Harry"</code>, <code>var_dump(28)</code> → <code>int(28)</code>, <code>var_dump(null)</code> → <code>NULL</code>.`,
          `Automatic conversion: string → int on <b>+</b> (<code>5 + "7"</code> is 12); int → float on <b>/</b> (<code>7 / 2</code> = 3.5). Type-cast with <code>(int)</code>, e.g. <code>$age = (int) "21";</code>, <code>(int) 3.5</code> = 3, <code>round(3.5)</code> = 4 (float).`,
          `<b>Constants</b>: <code>define("DB_NAME", "mySchool");</code> then use <code>DB_NAME</code> <b>without $</b>. Writing <code>$DB_NAME</code> refers to an (undefined) variable instead.`
        ]},
        { h: `Operators, strings and NULL`, pts: [
          `Arithmetic: <code>+ - * / % . ++ --</code>; assignment: <code>= += -= *= /= %= .=</code>.`,
          `String concatenation operator is <b>. (period)</b>, not +: <code>5 + "2 turtle doves"</code> → 7 (with a warning in PHP 8); <code>5 . "2 turtle doves"</code> → "52 turtle doves".`,
          `Zero-based indexing: <code>$favorite_food = "Ethiopian"; print $favorite_food[2];</code> → <b>h</b>. No char type; each letter is a string.`,
          `Functions (Java equivalent): <b>strlen</b> (length), <b>strpos</b> (indexOf), <b>substr</b> (substring), <b>strtolower / strtoupper</b>, <b>trim</b>, <b>explode / implode</b> (split / join), <b>strcmp</b> (compareTo).`,
          `With <code>$name = "Mohammed AbdelFattah"</code>: strlen = 20; strpos($name, "e") = 6; substr($name, 9, 5) = "Abdel"; strtoupper → "MOHAMMED ABDELFATTAH". <code>trim("Hello World!", "Hed!")</code> removes those characters from both ends → "llo Worl".`,
          `Strings in <b>double quotes are interpreted</b>: variables inside are replaced by their values: <code>"You are $age years old.\\n"</code> → You are 16 years old.`,
          `Strings in <b>single quotes are not interpreted</b>: <code>'You are $age years old.\\n'</code> prints the text literally, including \\n.`,
          `Use braces to avoid ambiguity: <code>"Today is your $ageth birthday"</code> looks for $ageth (not found); <code>"Today is your {$age}th birthday"</code> works.`,
          `A variable is <b>NULL</b> if it has not been set (undefined), has been assigned <code>NULL</code>, or was deleted with <b>unset()</b>. <b>isset()</b> tests whether it is not NULL. NULL prints as an empty string.`
        ]},
        { h: `Booleans, control structures, math`, pts: [
          `FALSE values: <b>0 and 0.0</b>, <b>"" and "0"</b>, <b>NULL</b> (including unset variables), <b>arrays with 0 elements</b>; all others are TRUE (the slide notes "0.00"/"0.000" as strings are TRUE). FALSE prints as an empty string; TRUE prints as <b>1</b>. <code>(bool) 7</code> → TRUE.`,
          `<code>if (...) {...} elseif (...) {...} else {...}</code> (note <b>elseif</b>); <b>for</b>, <b>while</b>, <b>do...while</b> are the same as Java; <b>foreach ($arr as $key =&gt; $value)</b> iterates arrays.`,
          `Math functions: abs, ceil, cos, floor, log, log10, max, min, pow, rand, round, sin, sqrt, tan; constants <b>M_PI, M_E, M_LN2</b>. <code>sqrt(pow(3,2) + pow(4,2))</code> = 5. int and float types: division of two ints can give a float.`,
          `Functions: <code>function name($param) { ... return $value; }</code> (keyword "function", no return type).`
        ]},
        { h: `Arrays (sheet 3 and exams)`, pts: [
          `<code>$XX = array("MM", "BB");</code> or <code>["MM", "BB"]</code>; <code>count($XX)</code> gives the size; <code>print_r($XX)</code> prints <code>Array ( [0] =&gt; MM [1] =&gt; BB )</code>.`,
          `<b>array_push($a, v)</b> add to end; <b>array_pop($a)</b> remove last and return it; <b>array_shift($a)</b> remove first and return it (re-indexes); <b>array_unshift</b> add to front; <b>sort($a)</b> ascending (uppercase letters sort before lowercase); <b>array_slice($a, offset, length)</b> returns <b>length</b> elements starting at offset (not an end index).`,
          `<b>explode(' ', "10 12 3")</b> → ["10","12","3"]; <b>implode(' ', $arr)</b> joins. <b>str_pad($s, n, " ", STR_PAD_LEFT)</b> pads on the left to width n.`
        ]},
        { h: `Forms with PHP (L10 login example)`, code: `<?php
echo "welcome in myform";
echo '<BR>';
if ($_SERVER["REQUEST_METHOD"] == "POST") {          // POST METHOD / GET METHOD
    if (empty($_POST["username"])) {
        echo "USERNAME is required" . "<br/>";
    } elseif (empty($_POST["password"])) {
        echo "PASSWORD is required" . "<br/>";
    } else {
        $username = $_POST["username"];
        $password = $_POST["password"];
        echo "Welcome, " . $username . "!";
    }
}
?>
<form action="" method="POST">       <!-- action="" posts back to the same page -->
  <label for="username">Username:</label>
  <input type="text" name="username" id="username"><br/>
  <label for="password">Password:</label>
  <input type="password" name="password" id="password"><br/>
  <input type="submit" value="Login">
</form>` },
        { h: `GET vs POST`, table: [
          [`GET ($_GET)`, `POST ($_POST)`],
          [`Data appended to the URL as name=value pairs`, `Data sent in the HTTP request body`],
          [`Visible, can be bookmarked, length-limited`, `Not visible in the URL, no practical size limit`],
          [`For non-sensitive requests (search)`, `For passwords, forms that change data`],
          [`$_SERVER["REQUEST_METHOD"] == "GET"`, `$_SERVER["REQUEST_METHOD"] == "POST"`]
        ]},
        { h: `PHP exercises (L10, solved in Sheet 3)`, code: `<?php
// Ex2: equations with $x = 10, $y = 7
$x = 10; $y = 7;
echo "$x + $y = " . ($x + $y) . "<br>";   // 10 + 7 = 17
echo "$x / $y = " . ($x / $y) . "<br>";   // 10 / 7 = 1.4285714285714
echo "$x % $y = " . ($x % $y) . "<br>";   // 10 % 7 = 3
// Ex3: one variable, assignment operators only
$v = 8;  echo "Value is now $v.<br>";
$v += 2; echo "Add 2. Value is now $v.<br>";        // 10
$v -= 4; echo "Subtract 4. Value is now $v.<br>";   // 6
$v *= 5; echo "Multiply by 5. Value is now $v.<br>"; // 30
$v /= 3; echo "Divide by 3. Value is now $v.<br>";  // 10
$v++;    echo "Increment value by one. Value is now $v.<br>"; // 11
$v--;    echo "Decrement value by one. Value is now $v.<br>"; // 10
// Ex5: single quotes + concatenation
$around = "around";
echo 'What goes ' . $around . ', comes ' . $around . '.';
// Ex6: month check
if (date('F', time()) == "August") echo "It's August, so it's really hot.";
else echo "Not August, so at least not in the peak of the heat.";
// Ex7: nested loops multiplication table 7x7
echo "<table border='1'>";
for ($i = 1; $i <= 7; $i++) {
  echo "<tr>";
  for ($j = 1; $j <= 7; $j++) echo "<td>" . ($i * $j) . "</td>";
  echo "</tr>";
}
echo "</table>";
?>` }
      ],
      cards: [
        [`PHP stands for`, `PHP Hypertext Preprocessor.`],
        [`PHP runs where?`, `On the server; only its output (HTML) reaches the browser.`],
        [`Why PHP? (3)`, `Free and open source, compatible (19 million sites in 2006), simple.`],
        [`5 characteristics of server-side programming`, `Dynamically edit content, respond to form data/queries, access databases, customize pages per user, security (code not visible).`],
        [`PHP code delimiters`, `&lt;?php ... ?&gt;`],
        [`PHP variable names`, `Start with $, case sensitive, declared by assignment.`],
        [`Is $3hello valid?`, `No: after $ a name must start with a letter or underscore ($_hello is valid).`],
        [`PHP concatenation operator`, `. (period).`],
        [`5 + "7" in PHP`, `12.`],
        [`5 . "2 turtle doves"`, `"52 turtle doves".`],
        [`Double vs single quotes`, `Double quotes interpolate variables; single quotes print literally.`],
        [`"{$age}th"`, `Braces separate the variable name from following letters.`],
        [`Define a constant`, `define("NAME", value); use NAME without $.`],
        [`var_dump("Harry")`, `string(5) "Harry".`],
        [`How TRUE / FALSE print`, `TRUE prints 1; FALSE prints an empty string.`],
        [`Values that are FALSE`, `0, 0.0, "", "0", NULL, empty array.`],
        [`isset($x)`, `True if $x exists and is not NULL.`],
        [`PHP comments`, `#, //, /* */.`],
        [`(int)(13/2)`, `6.`],
        [`array_slice($a, 1, 2)`, `2 elements starting at index 1 (offset, length).`]
      ],
      qa: [
        [`Explain the characteristics of server-side web programming. Why do we use PHP?`, `Server-side scripting can: (1) dynamically edit, change or add any content to a web page; (2) respond to user queries or data submitted from HTML forms; (3) access any data or databases and return the results to a browser; (4) customize a web page to make it more useful for individual users; (5) provide security since the server code cannot be viewed from a browser. We use PHP because it is free and open source, compatible (more than 19 million websites used it by November 2006) and simple; it is a server-side scripting language that makes pages dynamic, interfaces with databases and e-mail, authenticates users and processes form information, and it can be embedded in HTML.`],
        [`Describe what happens when a browser requests a URL from a web server, and when the URL names a PHP program.`, `The computer looks up the server's IP address using DNS; the browser connects to that IP and requests the file; the web server software (e.g. Apache) grabs the file from its local file system; the server sends back its contents. If the URL names a program (e.g. home.php), the server runs the program and sends back its output (HTML) instead of the source code.`],
        [`What are the similarities and differences between JavaScript and PHP?`, `<b>Similarities</b>: both are interpreted, loosely (dynamically) typed scripting languages with C/Java-like syntax (if, for, while, functions), both are embedded in HTML pages and used to build dynamic web pages, and both support arrays and objects. <b>Differences</b>: JavaScript runs on the client in the browser while PHP runs on the server; JS code is visible to users, PHP code is not; PHP can access databases and the server file system, client-side JS cannot read/write files; PHP variables start with $ and concatenate with ".", JS uses var/let/const and "+"; JS reacts to events in the page without reloading, PHP produces the page before it is sent.`],
        [`Explain PHP variables, data types and type conversion.`, `Variables start with $, are case sensitive and are declared by assignment; PHP is loosely typed. Types: int, float, boolean, string, array, object, NULL; check them with is_string() etc., gettype() and var_dump(). PHP converts automatically: string → number with + (5 + "7" = 12), int → float with / (7/2 = 3.5). Explicit casts use (int), (float), (bool), (string), e.g. (int)"21". Constants are made with define("NAME", value) and used without $.`],
        [`Explain interpreted strings in PHP with examples.`, `Double-quoted strings are interpreted: variables inside are replaced, so with $age = 16, "You are $age years old." prints You are 16 years old. Single-quoted strings are not interpreted: 'You are $age years old.\\n' prints exactly that text. When letters follow the variable name, enclose it in braces: "{$age}th birthday" (without braces PHP looks for $ageth).`]
      ],
      quiz: [
        { q: `What is PHP?`, o: [
          [`PHP is an open-source programming language`, `True, but not the only correct statement.`],
          [`PHP is used to develop dynamic and interactive websites`, `True, but not the only correct statement.`],
          [`PHP is a server-side scripting language`, `True, but not the only correct statement.`],
          [`All of the mentioned`, `Correct. All three statements describe PHP (L10).`]
        ], a: 3, src: `Exam 2025/26` },
        { q: `Which of the following is the correct syntax to write PHP code?`, o: [
          [`&lt;?php ?&gt;`, `Correct. Code between &lt;?php and ?&gt; is executed as PHP.`],
          [`&lt; php &gt;`, `Not a PHP delimiter.`],
          [`&lt; ? php ?&gt;`, `No spaces are allowed inside &lt;?php.`],
          [`&lt;? ?&gt;`, `Short tags exist but are often disabled; the standard form is A.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `Which is the right way of declaring a variable in PHP?`, o: [
          [`$3hello`, `A name cannot start with a digit after $.`],
          [`$_hello`, `Correct. Starts with $ followed by an underscore.`],
          [`$this`, `$this is reserved for the current object.`],
          [`$5_Hello`, `Starts with a digit.`]
        ], a: 1, src: `Exam 2025/26, 2024/25, 2023/24` },
        { q: `How to define a function in PHP?`, o: [
          [`functionName(parameters) {function body}`, `The keyword "function" is missing.`],
          [`function {function body}`, `The name and parameters are missing.`],
          [`function functionName(parameters) {function body}`, `Correct.`],
          [`data type functionName(parameters) {function body}`, `That is C/Java style; PHP has no leading return type.`]
        ], a: 2, src: `Exam 2024/25, 2023/24` },
        { q: `What will be the output of the following PHP code?<pre>&lt;?php
define("GREETING", "PHP is a scripting language");
echo $GREETING;
?&gt;</pre>`, o: [
          [`$GREETING`, `echo prints the value of the variable, not its name.`],
          [`no output`, `Correct (key answer). $GREETING is an undefined variable (constants are used without $), so nothing is echoed; PHP 8 also emits an "Undefined variable" warning if errors are displayed.`],
          [`PHP is a scripting language`, `That needs echo GREETING; (no $).`],
          [`GREETING`, `Not printed.`]
        ], a: 1, src: `Exam 2024/25, 2023/24` },
        { q: `What will be the output of the following PHP code?<pre>&lt;?php $a = "$winner"; $b = "/$looser"; echo $a,$b; ?&gt;</pre>`, o: [
          [`/`, `Correct. Inside double quotes the undefined variables $winner and $looser are replaced by empty strings, so $a = "" and $b = "/".`],
          [`$looser`, `Double quotes interpolate, they do not print the name.`],
          [`/$looser`, `$looser is interpolated (as empty).`],
          [`$winner/$looser`, `That would need single quotes.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `What will be the output?<pre>&lt;?php
function MXX($m, $n) {
  $ds = (int)($m / $n);
  return $m - $n * $ds;
}
echo MXX(13,2) . "\\n";
echo MXX(81,3) . "\\n";
?&gt;</pre>`, o: [
          [`6 and 27`, `Those are the integer quotients, not the returned values.`],
          [`1 and 0`, `Correct. MXX computes the remainder without %: 13 - 2*6 = 1; 81 - 3*27 = 0.`],
          [`1.5 and 0`, `(int) truncates 6.5 to 6, giving 1.`],
          [`0 and 1`, `Order reversed.`]
        ], a: 1, src: `Exam 2023/24; Sheet 3 (PHP)` },
        { q: `What will be the output?<pre>&lt;?php
function XXX($x, $y) {
  $a = explode(' ', trim($x));
  $b = explode(' ', trim($y));
  foreach ($a as $key =&gt; $value) {
    $output[$key] = $a[$key] * $b[$key];
  }
  return implode(' ', $output);
}
echo XXX(("10 12 3"), ("1 3 3")) . "\\n";
?&gt;</pre>`, o: [
          [`11 15 6`, `Elements are multiplied, not added.`],
          [`10 36 9`, `Correct. 10*1, 12*3, 3*3 joined with spaces.`],
          [`360`, `implode joins; it does not multiply everything.`],
          [`10 12 3 1 3 3`, `That would be concatenation.`]
        ], a: 1, src: `Exam 2023/24 (May); Sheet 3 (PHP)` },
        { q: `With <code>$d = 'A00';</code>, what does <code>for ($n=0; $n&lt;5; $n++) echo ++$d . "\\n";</code> print first and last?`, o: [
          [`A01 ... A05`, `Correct. PHP increments alphanumeric strings like a counter (Sheet 3 answer).`],
          [`1 ... 5`, `The string is not converted to a number.`],
          [`B00 ... F00`, `The rightmost character is incremented first.`],
          [`Error`, `Incrementing strings is allowed.`]
        ], a: 0, src: `Sheet 3 (PHP)` },
        { q: `What does <code>echo 5 + "7";</code> print in PHP?`, o: [
          [`57`, `PHP concatenation uses ".", not "+".`],
          [`12`, `Correct. The string is converted to a number on +.`],
          [`Error`, `PHP converts automatically.`],
          [`5`, `"7" is numeric.`]
        ], a: 1, src: `Lecture 10 example` },
        { q: `What does <code>5 . "2 turtle doves"</code> give in PHP?`, o: [
          [`7`, `That is 5 + "2 turtle doves".`],
          [`"52 turtle doves"`, `Correct. "." concatenates.`],
          [`"5 2 turtle doves"`, `No space is added.`],
          [`Error`, `Valid.`]
        ], a: 1, src: `Lecture 10 example` },
        { q: `<code>$favorite_food = "Ethiopian"; print $favorite_food[2];</code> prints:`, o: [
          [`t`, `t is at index 1.`],
          [`h`, `Correct. Zero-based: E=0, t=1, h=2.`],
          [`i`, `i is at index 3.`],
          [`Ethiopian`, `Brackets select one character.`]
        ], a: 1, src: `Lecture 10 example` },
        { q: `With <code>$age = 16;</code>, what does <code>print 'You are $age years old.';</code> print?`, o: [
          [`You are 16 years old.`, `That needs double quotes.`],
          [`You are $age years old.`, `Correct. Single-quoted strings are not interpreted.`],
          [`You are  years old.`, `The variable is not looked up at all.`],
          [`Error`, `Valid code.`]
        ], a: 1, src: `Lecture 10 example` },
        { q: `Which value is TRUE in PHP?`, o: [
          [`"0"`, `The string "0" is FALSE.`],
          [`""`, `The empty string is FALSE.`],
          [`array()`, `An array with 0 elements is FALSE.`],
          [`"0.00"`, `Correct. Per the lecture, "0.00" is not in the FALSE list, so it is TRUE.`]
        ], a: 3, src: `Lecture 10 example` },
        { q: `<code>$a = 7 / 2; $b = (int) $a; $c = round($a);</code> gives:`, o: [
          [`$a = 3, $b = 3, $c = 3`, `int / int can produce a float.`],
          [`$a = 3.5, $b = 3, $c = 4`, `Correct. (int) truncates; round gives 4.0 (float).`],
          [`$a = 3.5, $b = 4, $c = 4`, `(int) truncates, it does not round.`],
          [`$a = 3.5, $b = 3.5, $c = 3`, `No.`]
        ], a: 1, src: `Lecture 10 example` },
        { q: `<code>echo trim("Hello World!", "Hed!");</code> prints:`, o: [
          [`Hello World!`, `trim removes the listed characters from both ends.`],
          [`llo Worl`, `Correct. Leading H, e and trailing !, d are removed; stops at l on both sides.`],
          [`llo World`, `d is also in the list.`],
          [`lo Wor`, `l is not in the list.`]
        ], a: 1, src: `Lecture 10 example` }
      ]
    }
  ],
  exams: [
    { title: `Final Exam 2025/2026`, meta: `January 2026 · CS206 · 2nd CS (New Cr) · 2 hours · 60 marks · Dr. M. AbdelFattah, Dr. M. Awad`, note: `Transcribed from four phone photos (and the identical scan in the student PDF). No official key; answers are worked from the lectures and every code output was run with node (JS) or traced by hand (PHP). Some options carry pencil marks from a student: Q7 is ticked as "0 1 2", which is wrong (the correct output is undefined undefined undefined). Q3 and Q5 use print(), which is not standard browser JS; read print as console.log.`, sections: [
        { title: `Question 1 · Choose the correct answer`, marks: `30 marks`, items: [
            { type: `mcq`, q: `Which of the following methods can be used to display data in some form using Javascript?`, o: [`document.write()`, `console.log()`, `window.alert()`, `All of the above`], a: 3, why: `All are JS output methods (with innerHTML) (L7).` },
            { type: `mcq`, q: `What is PHP?`, o: [`PHP is an open-source programming language`, `PHP is used to develop dynamic and interactive websites`, `PHP is a server-side scripting language`, `All of the mentioned`], a: 3, why: `All three statements are true: PHP is free and open source, server-side, and used to make pages dynamic (L10).` },
            { type: `mcq`, q: `What will be the output of the following code snippet?<pre>var a = true + true + true * 3;
print(a)</pre>`, o: [`3`, `0`, `Error`, `5`], a: 3, why: `In arithmetic true = 1: 1 + 1 + (1 * 3) = 5 (verified with node) (L8).` },
            { type: `mcq`, q: `Which of the following is the correct syntax to write a PHP code?`, o: [`&lt;?php ?&gt;`, `&lt; php &gt;`, `&lt; ? php ?&gt;`, `&lt;? ?&gt;`], a: 0, why: `PHP code goes between &lt;?php and ?&gt; (L10).` },
            { type: `mcq`, q: `What will be the output of the following code snippet?<pre>a = [1, 2, 3, 4, 5];
print(a.slice(2, 4));</pre>`, o: [`3, 4`, `2, 3`, `3, 4, 5`, `2, 3, 4`], a: 0, why: `slice(2,4) copies indexes 2 and 3 (end excluded) = [3, 4] (L8).` },
            { type: `mcq`, q: `Which is the right way of declaring a variable in PHP?`, o: [`$3hello`, `$_hello`, `$this`, `$5_Hello`], a: 1, why: `After $ a name must start with a letter or underscore; $this is reserved (L10).` },
            { type: `mcq`, q: `What will be the output of the following code snippet?<pre>const example = ({ a, b, c }) =&gt; {
  console.log(a, b, c);
};
example(0, 1, 2);</pre>`, o: [`0 1 2`, `0 Undefined Undefined`, `Undefined Undefined Undefined`, `None of the above`], a: 2, why: `The function destructures one object argument; 0 has no a, b or c properties, so all three are undefined (verified with node) (L9).`, key: `The photo has a pencil tick on A (0 1 2); that is wrong.` },
            { type: `mcq`, q: `What will be the output of the following PHP code?<pre>&lt;?php $a = "$winner"; $b = "/$looser"; echo $a,$b; ?&gt;</pre>`, o: [`/`, `$looser`, `/$looser`, `$winner/$looser`], a: 0, why: `Double-quoted strings are interpolated: $winner and $looser are undefined (empty), so $a = "" and $b = "/"; echo prints "/" (with "Undefined variable" warnings if errors are displayed) (L10).` },
            { type: `mcq`, q: `How do we write a comment in javascript?`, o: [`\\*comment *\\`, `// comment`, `# comment`, `$ comment`], a: 1, why: `// starts a single-line JS comment (/* */ is the multi-line form; the backslash version in A is wrong) (L7).` },
            { type: `mcq`, q: `Which of the following property is used to specify table borders in CSS?`, o: [`table`, `border`, `table:border`, `none of the mentioned`], a: 1, why: `table, th, td { border: 1px solid black; } (L5).` },
            { type: `mcq`, q: `Which of the following property is used to control the space between the border and content in a table?`, o: [`border`, `margin`, `padding`, `resize`], a: 2, why: `Padding is the space between content and border; margin is outside the border (L4).` },
            { type: `mcq`, q: `Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?`, o: [`Src`, `Longdesc`, `alt`, `title`], a: 2, why: `alt is the required alternate text attribute (L2).` },
            { type: `mcq`, q: `What is the correct HTML for referring to an external style sheet?`, o: [`&lt;link rel="stylesheet" type="text/css" href="mystyle.css"&gt;`, `&lt;stylesheet&gt;mystyle.css&lt;/stylesheet&gt;`, `&lt;style src="mystyle.css"&gt;`, `Not Found`], a: 0, why: `External CSS is linked with &lt;link rel="stylesheet" href="..."&gt; in the head (L4).` },
            { type: `mcq`, q: `Which CSS property controls the text size?`, o: [`text-style`, `text-size`, `font-style`, `font-size`], a: 3, why: `font-size (L3/L4).` },
            { type: `mcq`, q: `Which function is used to serialize an object into a JSON string in Javascript?`, o: [`stringify()`, `parse()`, `convert()`, `None of the above`], a: 0, why: `JSON.stringify() converts an object to a JSON string; JSON.parse() does the reverse (L9).` },
            { type: `mcq`, q: `Colors are defined in HTML using?`, o: [`RGB Values`, `Hex Values`, `RGBA Values`, `All of the above`], a: 3, why: `Colors can be names, RGB, HEX, HSL, RGBA or HSLA (L3).` },
            { type: `mcq`, q: `What is the purpose of a SQL injection attack?`, o: [
                `Improving website aesthetics`,
                `Injecting malicious scripts into web pages`,
                `Gaining unauthorized access to a database by manipulating SQL queries`,
                `Enhancing server performance`
              ], a: 2, why: `SQL injection inserts rogue code into queries to change tables, get information or delete data (L1). B describes XSS.` },
            { type: `mcq`, q: `What is the purpose of encrypting data in transit?`, o: [`Improving website aesthetics`, `Optimizing server processing speed`, `Protecting data from interception during transmission`, `Enhancing user interfaces`], a: 2, why: `Encryption (SSL/HTTPS) protects data while it travels (L1).` },
            { type: `mcq`, q: `In HTML, which attribute is used to create a link that opens in a new window tab?`, o: [`src="_blank"`, `alt="_blank"`, `target="_self"`, `target="_blank"`], a: 3, why: `target="_blank" opens a new tab; _self is the same tab (L2).` },
            { type: `mcq`, q: `How to create a checkbox in HTML Form?`, o: [`&lt;input type="text"&gt;`, `&lt;input type="textarea"&gt;`, `&lt;input type="checkbox"&gt;`, `&lt;input type="button"&gt;`], a: 2, why: `type="checkbox" lets the user select zero or more options (L6).` }
          ] },
        { title: `Question 2 · Theory and code output`, marks: `15 marks`, items: [
            { type: `written`, q: `(a)(i) [3 marks] Explain different design issues at the time of designing an effective website.`, ans: `<b>1) Information availability</b>: include all information that helps visitors decide; a good site provides 80-90% of what the visitor looks for.<br><b>2) Page layout</b>: content arranged so visitors find relevant content quickly, otherwise they lose interest and leave; keep the page simple.<br><b>3) Colors</b>: use standard colors (blue links, violet visited links, red active links) to avoid confusing visitors.<br><b>4) Web accessibility</b>: usable and contributable by everyone, including people with visual, audio, physical or speech disabilities.<br><b>5) User-friendly site</b>: built on what the audience requires (UI/UX).<br><b>6) Download speed</b>: cannot be determined by the designer, but optimize graphics (images not larger than 10 KB), make smaller pages and avoid nested tables. (L1)` },
            { type: `written`, q: `(a)(ii) [3 marks] Explain the characteristic of Server-Side web programming. Why do we use PHP language?`, ans: `<b>Characteristics</b>: server-side scripting can (1) dynamically edit, change or add any content to a web page; (2) respond to user queries or data submitted from HTML forms; (3) access any data or databases and return the results to a browser; (4) customize a web page to make it more useful for individual users; (5) provide security since your server code cannot be viewed from a browser.<br><b>Why PHP</b>: free and open source; compatible (more than 19 million websites used PHP by November 2006); simple. It makes pages dynamic, interfaces with databases and e-mail, authenticates users and processes forms, and can be embedded in HTML. (L10)` },
            { type: `written`, q: `(b)(i) [3 marks] What is the output of the following code? Why?<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt; &lt;head&gt;
&lt;style&gt;
div {
  width: 100px; height: 100px; background-color: red;
  position: relative; animation-name: example;
  animation-duration: 20s; animation-iteration-count: infinite;
}
@keyframes example {
  0%   {background-color:red;    left:0px;   top:0px;}
  25%  {background-color:yellow; left:200px; top:0px;   transform: rotate(90deg);}
  50%  {background-color:blue;   left:200px; top:200px; transform: rotate(-90deg);}
  75%  {background-color:green;  left:0px;   top:200px; transform: rotate(360deg);}
  100% {background-color:red;    left:0px;   top:0px;   transform: rotate(-360deg);}
}
&lt;/style&gt; &lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;CSS Animation&lt;/h1&gt;
&lt;div&gt; &lt;CENTER&gt;&lt;BR&gt;&lt;BR&gt; HELLO&lt;BR&gt; LEVEL(2) &lt;/CENTER&gt; &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>`, ans: `<b>Output:</b> the heading "CSS Animation", then a 100x100px red square containing two blank lines and the centered text "HELLO" / "LEVEL(2)" (the text overflows the 100px box downward).<br><b>Why:</b> the div has <code>position:relative</code> so <code>left/top</code> move it, and the <code>@keyframes example</code> animation runs for 20 s and repeats forever (<code>infinite</code>):<br>0% red at (0,0) &rarr; 25% yellow, moved right to left=200px, rotated 90deg &rarr; 50% blue at (200px,200px) (moved down), rotated -90deg &rarr; 75% green at (0,200px) (moved left), rotated 360deg &rarr; 100% back to red at (0,0), rotated -360deg.<br>So the box travels clockwise around a 200px square (right, down, left, up), smoothly changing color red &rarr; yellow &rarr; blue &rarr; green &rarr; red and spinning, every 5 seconds per side, forever.` },
            { type: `written`, q: `(b)(ii) [3 marks] What is the output of the following PHP code? Why?<pre>&lt;?php
for ($i = 1; $i &lt; 7; $i++) {
  for ($j = 1; $j &lt; 7; $j++) {
    if ($j == 1) {
      echo str_pad($i*$j, 2, " ", STR_PAD_LEFT);
    } else {
      echo str_pad($i*$j, 4, " ", STR_PAD_LEFT);
    }
  }
  echo "\\n";
}
?&gt;</pre>`, ans: `It prints the 6x6 multiplication table. The first column is padded on the left to width 2 and the other columns to width 4 (<code>str_pad(..., STR_PAD_LEFT)</code>), with "\\n" after each row:<pre> 1   2   3   4   5   6
 2   4   6   8  10  12
 3   6   9  12  15  18
 4   8  12  16  20  24
 5  10  15  20  25  30
 6  12  18  24  30  36</pre>This layout appears in a terminal or inside &lt;pre&gt; (or in "view source"). Rendered as normal HTML in a browser, the extra spaces and "\\n" collapse, so it shows all 36 numbers on one line separated by single spaces: 1 2 3 4 5 6 2 4 6 8 ... 30 36. (Same as Sheet 3 PHP, exercise 8.)` },
            { type: `written`, q: `(b)(iii) [3 marks] What is the output of the following JavaScript code? Why?<pre>function FM(...X) {
  let L = X[0];
  for (let i = 1; i &lt; X.length; i++) {
    if (X[i] &lt; L) {
      L = X[i];
    }
  }
  return L;
}
console.log(FM(5, 10, -1, 8));</pre>`, ans: `<b>Output: -1</b><br>FM uses a rest parameter, so X = [5, 10, -1, 8]. L starts at X[0] = 5; i=1: 10 &lt; 5? no; i=2: -1 &lt; 5 &rarr; L = -1; i=3: 8 &lt; -1? no. It returns the <b>minimum</b>, -1 (verified with node).` }
          ] },
        { title: `Question 3 · Design`, marks: `15 marks`, items: [
            { type: `written`, q: `(a) [8 marks] Design the following calculator using HTML, CSS and JavaScript to simulate a calculator with basic arithmetic operators (+, -, *, /) for pressed N input numbers from calculator buttons only. The function should be displaying the result when we press the button "=" and store the result in the JavaScript storage. Finally, the button "c" is to clear. (Figure: a display box and a "c" button on top; rows 1 2 3 /, 4 5 6 *, 7 8 9 -, 0 = +.)`, ans: `Buttons append their character to a read-only display; "=" checks the expression contains only digits and operators, evaluates it with eval() (the built-in function from L9), shows the result and saves it with localStorage.setItem; "c" clears.<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;style&gt;
  table { background: #333; padding: 8px; }
  input#disp { width: 220px; height: 30px; font-size: 18px; text-align: right; }
  button { width: 50px; height: 40px; font-size: 18px; color: white;
           background: #555; border: 1px solid #222; }
  button:hover { background: #777; }
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;table&gt;
  &lt;tr&gt;&lt;td colspan="3"&gt;&lt;input id="disp" readonly&gt;&lt;/td&gt;
      &lt;td&gt;&lt;button onclick="clr()"&gt;c&lt;/button&gt;&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;&lt;button onclick="press('1')"&gt;1&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;button onclick="press('2')"&gt;2&lt;/button&gt;&lt;/td&gt;
      &lt;td&gt;&lt;button onclick="press('3')"&gt;3&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;button onclick="press('/')"&gt;/&lt;/button&gt;&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;&lt;button onclick="press('4')"&gt;4&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;button onclick="press('5')"&gt;5&lt;/button&gt;&lt;/td&gt;
      &lt;td&gt;&lt;button onclick="press('6')"&gt;6&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;button onclick="press('*')"&gt;*&lt;/button&gt;&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;&lt;button onclick="press('7')"&gt;7&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;button onclick="press('8')"&gt;8&lt;/button&gt;&lt;/td&gt;
      &lt;td&gt;&lt;button onclick="press('9')"&gt;9&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;button onclick="press('-')"&gt;-&lt;/button&gt;&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;&lt;button onclick="press('0')"&gt;0&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;
      &lt;td&gt;&lt;button onclick="equal()"&gt;=&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;button onclick="press('+')"&gt;+&lt;/button&gt;&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;script&gt;
let d = document.getElementById("disp");
function press(k) { d.value += k; }                 // N numbers and operators
function clr() { d.value = ""; }                     // 'c' clears
function equal() {
  if (!/^[0-9+\\-*/.]+$/.test(d.value)) { d.value = "Error"; return; }
  let result = eval(d.value);                        // evaluate the expression
  d.value = result;
  localStorage.setItem("lastResult", result);        // JavaScript storage
}
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>Example: pressing 1 2 + 3 * 2 = shows 18 (normal operator precedence) and stores lastResult = 18 in localStorage.` },
            { type: `written`, q: `(b) [7 marks] Design the following distance form using HTML & PHP. It calculates the distance between two aircrafts: the fighter aircraft at position (xf, yf) and enemy bomber at position (xb, yb). It should be validating the two aircrafts' positions fields not to be blank. Additionally, the form action displays the distance between two aircrafts on the web page using appropriate PHP method. dist = &radic;((xb - xf)<sup>2</sup> + (yb - yf)<sup>2</sup>). (Form: Fighter Position XF, YF; Bomber Position XB, YB; button "Calc Dist.")`, ans: `The form posts to itself (action="") with method POST (positions are not shown in the URL); PHP checks $_SERVER["REQUEST_METHOD"], validates that no field is blank (and is numeric), then computes the distance with sqrt and pow.<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;Distance&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
&lt;form action="" method="post"&gt;
  &lt;b&gt;Fighter Position:&lt;/b&gt;&lt;br&gt;
  XF: &lt;input type="text" name="xf"&gt;&lt;br&gt;
  YF: &lt;input type="text" name="yf"&gt;&lt;br&gt;
  &lt;b&gt;Bomber Position:&lt;/b&gt;&lt;br&gt;
  XB: &lt;input type="text" name="xb"&gt;&lt;br&gt;
  YB: &lt;input type="text" name="yb"&gt;&lt;br&gt;
  &lt;input type="submit" value="Calc Dist."&gt;
&lt;/form&gt;
&lt;?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $f = ["xf", "yf", "xb", "yb"];
    $ok = true;
    foreach ($f as $k) {
        if (trim($_POST[$k]) === "" || !is_numeric($_POST[$k])) { $ok = false; }
    }
    if (!$ok) {
        echo "All positions are required and must be numbers.";
    } else {
        $xf = $_POST["xf"]; $yf = $_POST["yf"];
        $xb = $_POST["xb"]; $yb = $_POST["yb"];
        $dist = sqrt(pow($xb - $xf, 2) + pow($yb - $yf, 2));
        echo "Distance between the two aircrafts = " . round($dist, 2);
    }
}
?&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>Example: fighter (0, 0), bomber (3, 4) &rarr; distance = 5.` }
          ] }
      ] },
    { title: `Final Exam 2024/2025`, meta: `January 2025 · CS206 · 2nd CS (New Cr) · 2 hours · 60 marks · Dr. M. AbdelFattah and a second examiner`, note: `Transcribed from two phone photos (also included in the student solution PDF). The student key (Abdullah Elwan) for Q1 is 1-C, 2-A, 3-A, 4-D, 5-C, 6-B, 7-C, 8-A, 9-A, 10-C, 11-A, 12-C, 13-B, 14-C, 15-C, 16-A, 17-C, 18-B, 19-B, 20-B and agrees with the answers here. In Q2(b)(ii) the student explains array_slice as taking a start and END index; it actually takes an offset and a LENGTH (the result is the same here by coincidence). All JS outputs verified with node; PHP traced by hand.`, sections: [
        { title: `Question 1 · Choose the correct answer`, marks: `20 marks`, items: [
            { type: `mcq`, q: `What will be the output of the following code snippet?<pre>(function (a) { return (function () { console.log(a); a = 6; })() })(21);</pre>`, o: [`6`, `NaN`, `21`, `None of the above`], a: 2, why: `The inner function prints the outer a (21) through closure before assigning 6. Verified with node (L9).` },
            { type: `mcq`, q: `Which function is used to serialize an object into a JSON string in Javascript?`, o: [`stringify()`, `parse()`, `convert()`, `None of the above`], a: 0, why: `JSON.stringify() converts an object to a JSON string; JSON.parse() does the reverse (L9).` },
            { type: `mcq`, q: `How can a datatype be declared to be a constant type?`, o: [`const`, `var`, `let`, `constant`], a: 0, why: `const declares a constant that cannot be reassigned (L7).` },
            { type: `mcq`, q: `Which of the following methods can be used to display data in some form using Javascript?`, o: [`document.write()`, `console.log()`, `window.alert()`, `All of the above`], a: 3, why: `All are JS output methods (with innerHTML) (L7).` },
            { type: `mcq`, q: `Which of the following methods is used to access HTML elements using Javascript?`, o: [`getElementbyId()`, `getElementsByClassName()`, `Both A and B`, `None of the above`], a: 2, why: `Both are DOM methods for accessing elements (L7).` },
            { type: `mcq`, q: `Choose the correct HTML element to define important text`, o: [`&lt;i&gt;`, `&lt;strong&gt;`, `&lt;b&gt;`, `&lt;important&gt;`], a: 1, why: `&lt;strong&gt; defines important text; &lt;b&gt; is only visual bold (L3).` },
            { type: `mcq`, q: `What is the correct HTML for inserting an image?`, o: [
                `&lt;img alt="MyImage"&gt;image.gif&lt;/img&gt;`,
                `&lt;image src="image.gif" alt="MyImage"&gt;`,
                `&lt;img src="image.gif" alt="MyImage"&gt;`,
                `&lt;img href="image.gif" alt="MyImage"&gt;`
              ], a: 2, why: `&lt;img&gt; is an empty element with src (path) and alt (alternate text) (L2).` },
            { type: `mcq`, q: `Which property is used to change the background color?`, o: [`background-color`, `Color`, `bgcolor`, `None`], a: 0, why: `background-color is the CSS property; color is the text color; bgcolor is an obsolete attribute (L3).` },
            { type: `mcq`, q: `Relative URLs are used to`, o: [`link other pages within the same site`, `link the same page with other sites`, `link other pages with other sites`, `does not link`], a: 0, why: `A relative URL has no domain, so it points inside the same site (L2).` },
            { type: `mcq`, q: `Which HTML tag is used to display the power in expression`, o: [`&lt;p&gt;`, `&lt;sub&gt;`, `&lt;sup&gt;`, `None of the above`], a: 2, why: `&lt;sup&gt; (superscript) raises text half a character; &lt;sub&gt; is for H2O (L3).` },
            { type: `mcq`, q: `Javascript is an _______ language?`, o: [`Object-Oriented`, `Object-Based`, `Procedural`, `None of the above`], a: 0, why: `The course MCQ sheet (Sanfoundry) gives Object-Oriented: JS is a prototype-based object-oriented language. Some books say object-based; answer A as the key does.` },
            { type: `mcq`, q: `How to define a function in PHP?`, o: [
                `functionName(parameters) {function body}`,
                `function {function body}`,
                `function functionName(parameters) {function body}`,
                `data type functionName(parameters) {function body}`
              ], a: 2, why: `PHP functions start with the keyword function, then the name and parameters (L10).` },
            { type: `mcq`, q: `Which is the right way of declaring a variable in PHP?`, o: [`$3hello`, `$_hello`, `$this`, `$5_Hello`], a: 1, why: `After $ a name must start with a letter or underscore; $this is reserved (L10).` },
            { type: `mcq`, q: `Which of these elements are all &lt;table&gt; elements?`, o: [`&lt;table&gt;&lt;head&gt;&lt;tfoot&gt;`, `&lt;table&gt;&lt;tr&gt;&lt;tt&gt;`, `&lt;table&gt;&lt;tr&gt;&lt;td&gt;`, `&lt;thead&gt;&lt;body&gt;&lt;tr&gt;`], a: 2, why: `table, tr (row) and td (cell) are all table elements; &lt;head&gt;, &lt;tt&gt;, &lt;body&gt; are not (L5).` },
            { type: `mcq`, q: `How do you add a background color for all &lt;h1&gt; elements?`, o: [`h1.all {background-color:#FFFFFF;}`, `all.h1 {background-color:#FFFFFF;}`, `h1 {background-color:#FFFFFF;}`, `None of the above`], a: 2, why: `The element selector h1 targets every &lt;h1&gt;; h1.all would need class="all" (L4).` },
            { type: `mcq`, q: `Which property is used to change the font of an element?`, o: [`font-family`, `font-weight`, `font-style`, `font-property`], a: 0, why: `font-family sets the font; font-weight = boldness, font-style = italic (L3/L4).` },
            { type: `mcq`, q: `How can you make a bulleted list?`, o: [`&lt;list&gt;`, `&lt;ol&gt;`, `&lt;ul&gt;`, `&lt;dl&gt;`], a: 2, why: `&lt;ul&gt; is the unordered (bulleted) list; &lt;ol&gt; is numbered (L5).` },
            { type: `mcq`, q: `Which doctype is correct for HTML5?`, o: [`&lt;!DOCTYPE HTML5&gt;`, `&lt;!DOCTYPE html&gt;`, `&lt;!DOCTYPE&gt;`, `None`], a: 1, why: `The HTML5 declaration is &lt;!DOCTYPE html&gt; (L2).` },
            { type: `mcq`, q: `What will be the output of the following PHP code?<pre>&lt;?php define("GREETING", "PHP is a scripting language"); echo $GREETING; ?&gt;</pre>`, o: [`$GREETING`, `no output`, `PHP is a scripting language`, `GREETING`], a: 1, why: `Constants are used without $: echo GREETING; would print the text. $GREETING is an undefined variable, so nothing is echoed (PHP 8 also raises an "Undefined variable" warning if errors are displayed) (L10).` },
            { type: `mcq`, q: `What will be the output of the following PHP code?<pre>&lt;?php
define("GREETING", "PHP is a scripting language");
echo $GREETING;
?&gt;</pre>`, o: [`$GREETING`, `no output`, `PHP is a scripting language`, `GREETING`], a: 1, why: `Same as the previous question written on several lines: $GREETING is an undefined variable, so there is no output (L10).` }
          ] },
        { title: `Question 2 · Theory and code output`, marks: `20 marks`, items: [
            { type: `written`, q: `(a)(i) [4 marks] What is CSS? Explain the different types of CSS.`, ans: `CSS (Cascading Style Sheets) is used to format the layout of a web page: color, font, text size, spacing between elements, positioning, background images/colors, and different displays for different devices and screen sizes. CSS is added in 3 ways:<br><b>1) Inline</b>: the style attribute inside an element; applies a unique style to a single element: <code>&lt;h1 style="color:blue;"&gt;A Blue Heading&lt;/h1&gt;</code>.<br><b>2) Internal</b>: a &lt;style&gt; element in the &lt;head&gt;; defines styles for a single page: <code>&lt;style&gt; body {background-color: powderblue;} h1 {color: blue;} &lt;/style&gt;</code>.<br><b>3) External</b>: a &lt;link&gt; element in the head of each page; one .css file (no HTML inside) styles many pages: <code>&lt;link rel="stylesheet" href="styles.css"&gt;</code> (full URL, /html/styles.css, or same-folder path). (L4)` },
            { type: `written`, q: `(a)(ii) [4 marks] "The Web works on client-server approach". Mention the steps that explain how the web works.`, ans: `1) The user enters the URL (e.g. http://www.tutorialspoint.com) in the browser's address bar.<br>2) The browser requests the IP address of the domain from the Domain Name Server (DNS).<br>3) After receiving the IP address, the browser sends the request for the page to the web server using HTTP, which specifies how the browser and server communicate.<br>4) The web server receives the request, searches for the page; if found it returns it to the browser and closes the HTTP connection.<br>5) The browser receives the page, interprets it and displays its contents in the browser window. (L1)` },
            { type: `written`, q: `(b)(i) [4 marks] What is the output of the following HTML/JavaScript code segment? Why?<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;style&gt;
#demo {
  color: blue;
  font-size: 200%;
  text-decoration: overline underline;
  Transform: translate(25%);
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;Please input a number:&lt;/p&gt;
&lt;input id="numb" type="number"&gt;
&lt;button type="btn" Onclick="GX()"&gt;Submit&lt;/button&gt;
&lt;p id="demo"&gt;&lt;/p&gt;
&lt;script&gt;
function GX() {
  var x, text;
  x = document.getElementById("numb").value;
  if (isNaN(x) || x &lt; 1 || x &gt; 10) {
    text = "Wrong";
  } else {
    text = "Good";
  }
  document.getElementById("demo").innerHTML = text;
}
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>`, ans: `The page shows "Please input a number:", a number box and a Submit button. Clicking Submit calls <code>GX()</code> (HTML attribute names are case-insensitive, so <code>Onclick</code> works; <code>type="btn"</code> is invalid so it becomes a default button, and with no form it just runs the handler).<br>GX reads the value: if it is not a number, less than 1 or greater than 10 it writes <b>Wrong</b>, otherwise <b>Good</b> into &lt;p id="demo"&gt;. E.g. 5 &rarr; Good; 15 &rarr; Wrong; 0 or empty &rarr; Wrong ("" &lt; 1 is true).<br>The result paragraph is styled by <code>#demo</code>: <b>blue</b>, <b>200% font size</b>, a line <b>above and below</b> the text (overline underline), and shifted right by 25% of its own width (<code>transform: translate(25%)</code>; property names are case-insensitive so "Transform" still works).` },
            { type: `written`, q: `(b)(ii) [4 marks] What is the output of the following PHP code segment? Why?<pre>&lt;?php
$XX = array("MM", "BB", "KK", "HH", "AA");
for ($i = 0; $i &lt; count($XX); $i++) {
  $XX[$i] = strtolower($XX[$i]);
}
$YY = array_shift($XX);
$ZZ = array_pop($XX);
echo "shift:$YY and Pop=$ZZ &lt;br/&gt;";
array_push($XX, "AA");
echo " push:AA\\n"."&lt;pre&gt;";
print_r($XX);
sort($XX);
echo "Sort:&lt;pre&gt;";
print_r($XX);
$best = array_slice($XX, 1, 2);
echo "slice:\\n"."&lt;pre&gt;";
print_r($best);
?&gt;</pre>`, ans: `<pre>shift:mm and Pop=aa
 push:AA
Array
(
    [0] =&gt; bb
    [1] =&gt; kk
    [2] =&gt; hh
    [3] =&gt; AA
)
Sort:
Array
(
    [0] =&gt; AA
    [1] =&gt; bb
    [2] =&gt; hh
    [3] =&gt; kk
)
slice:
Array
(
    [0] =&gt; bb
    [1] =&gt; hh
)</pre><b>Why:</b> strtolower makes [mm, bb, kk, hh, aa]; array_shift removes and returns "mm"; array_pop removes and returns "aa" &rarr; [bb, kk, hh]; array_push adds "AA" &rarr; [bb, kk, hh, AA]; sort orders strings by character code, and uppercase "A" (65) comes before lowercase letters, so [AA, bb, hh, kk]; <code>array_slice($XX, 1, 2)</code> takes <b>2 elements starting at offset 1</b> &rarr; [bb, hh]. (The student solution says array_slice takes "start and end index"; that is wrong, the third argument is a length, it only gives the same result here by coincidence.)` },
            { type: `written`, q: `(b)(iii) [4 marks] What is the output of the following code segment? Why?<pre>&lt;html&gt;
&lt;body&gt;
&lt;script&gt;
let X = (...A) =&gt; {
  var R = A[0];
  for (var i = 1; i &lt; A.length; i++) {
    if (R &lt; A[i]) R = A[i];
  }
  return R;
}
document.write(X(8,7,10,20,30) + "&lt;br/&gt;");
document.write(X(10,20,60) + "&lt;br/&gt;");
document.write(X(8,7) + "&lt;br/&gt;");
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>`, ans: `<b>Output</b> (three lines):<br>30<br>60<br>8<br><b>Why:</b> X is an arrow function with a rest parameter that returns the <b>maximum</b> of its arguments (R is replaced whenever a larger value is found): max(8,7,10,20,30) = 30, max(10,20,60) = 60, max(8,7) = 8; each is followed by &lt;br/&gt; (verified with node).` }
          ] },
        { title: `Question 3 · Design`, marks: `20 marks`, items: [
            { type: `written`, q: `(a) [10 marks] Write a JavaScript FUNCTION to compute a GPA {A+, A, A-, B+, B, B-, C+, C, C-, D+, D, D-, F} according to the following table from 6 subject scores. The function should request 6 subject scores, with their Cr. Hours [3/2/0] and display Accumulated GPA using window input/output methods. The function should be repeated for N students and store each acc. GPA for all students in the JavaScript storage.<br>Table (Grade / GPA / Range): A+ 4 &ge;96; A 3.7 &ge;92; A- 3.4 &ge;88; B+ 3.2 &ge;84; B 3 &ge;80; B- 2.8 &ge;76; C+ 2.6 &ge;72; C 2.4 &ge;68; C- 2.2 &ge;64; D+ 2 &ge;60; D 1.5 &ge;55; D- 1 &ge;50; F 0 &lt;50.<br>[Hint: subject scores S(i), i = 0..5, each from 100. Accumulated GPA = &Sigma; G<sub>i</sub>H<sub>i</sub> / TH, where G is the subject GPA, H its credit hours and TH the total registration hours.]`, ans: `<pre>&lt;script&gt;
// grade table: [minimum score, GPA points, letter]
const TABLE = [[96,4.0,"A+"],[92,3.7,"A"],[88,3.4,"A-"],[84,3.2,"B+"],[80,3.0,"B"],
               [76,2.8,"B-"],[72,2.6,"C+"],[68,2.4,"C"],[64,2.2,"C-"],[60,2.0,"D+"],
               [55,1.5,"D"],[50,1.0,"D-"],[0,0.0,"F"]];
function gradeOf(score) {            // returns [G, letter] for one subject
  for (let r of TABLE) if (score &gt;= r[0]) return [r[1], r[2]];
  return [0, "F"];
}
function computeGPA() {
  let N = parseInt(window.prompt("Enter the number of students:"));
  let all = [];
  for (let st = 1; st &lt;= N; st++) {
    let sumGH = 0, TH = 0, report = "";
    for (let i = 0; i &lt; 6; i++) {                       // S(i), i = 0..5
      let S = parseFloat(window.prompt("Student " + st + ": score of subject " + (i + 1) + " (0-100):"));
      let H = parseInt(window.prompt("Credit hours of subject " + (i + 1) + " (3, 2 or 0):"));
      let g = gradeOf(S);
      sumGH += g[0] * H;                                // sum of G(i) * H(i)
      TH += H;                                          // total registered hours
      report += "Subject " + (i + 1) + ": " + g[1] + " (" + g[0] + ")\\n";
    }
    let gpa = (TH &gt; 0) ? (sumGH / TH) : 0;              // accumulated GPA
    window.alert(report + "Accumulated GPA = " + gpa.toFixed(2));
    all.push({ student: st, gpa: gpa.toFixed(2) });
    localStorage.setItem("student" + st, gpa.toFixed(2));
  }
  localStorage.setItem("allGPA", JSON.stringify(all));  // all students together
}
computeGPA();
&lt;/script&gt;</pre><b>Check</b>: scores 95 (3 h), 85 (3 h), 70 (2 h), 50 (2 h), 99 (3 h), 40 (0 h) &rarr; G = 3.7, 3.2, 2.4, 1.0, 4.0, 0 &rarr; &Sigma;GH = 11.1 + 9.6 + 4.8 + 2.0 + 12.0 + 0 = 39.5, TH = 13 &rarr; GPA = 3.04. Subjects with 0 hours do not affect the GPA.` },
            { type: `written`, q: `(b) [10 marks] Design the following Children Ideal Weight (CIW) estimator form using HTML & PHP with validations on the child's age coefficients (Years, Months) fields that should not be blank. Additionally, the form action displays the ideal weight for the child on the web page using appropriate PHP method. Infants &lt; 12 months: Weight (kg) = (age in months + 9)/2; Children aged 1-5 years: Weight = 2 x (age in years + 5); Children aged 5-14 years: Weight = 4 x age in years. (Form: "Estimate Childern Ideal Weights", Years, Months, Estimate button.)`, ans: `<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;Children Ideal Weight&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
&lt;form action="" method="post"&gt;
  &lt;h3&gt;Estimate Children Ideal Weights&lt;/h3&gt;
  &lt;label for="years"&gt;Years :&lt;/label&gt;
  &lt;input type="number" id="years" name="years" min="0"&gt;&lt;br&gt;
  &lt;label for="months"&gt;Months:&lt;/label&gt;
  &lt;input type="number" id="months" name="months" min="0" max="11"&gt;&lt;br&gt;
  &lt;input type="submit" value="Estimate"&gt;
&lt;/form&gt;
&lt;?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $years  = trim($_POST["years"]);
    $months = trim($_POST["months"]);
    if ($years === "" || $months === "") {               // validation: not blank
        echo "Years and Months are required.";
    } elseif (!is_numeric($years) || !is_numeric($months)) {
        echo "Years and Months must be numbers.";
    } else {
        $ageMonths = $years * 12 + $months;              // total age in months
        if ($ageMonths &lt; 12) {                           // infants
            $w = ($ageMonths + 9) / 2;
        } elseif ($years &gt;= 1 &amp;&amp; $years &lt;= 5) {          // children 1-5 years
            $w = 2 * ($years + 5);
        } elseif ($years &gt; 5 &amp;&amp; $years &lt;= 14) {          // children 5-14 years
            $w = 4 * $years;
        } else {
            $w = -1;
        }
        if ($w &lt; 0) echo "Age not supported (0-14 years only).";
        else echo "The ideal weight is $w kg";
    }
}
?&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>POST is the appropriate method (data in the request body, not the URL). Examples: 0 years 6 months &rarr; (6+9)/2 = 7.5 kg; 3 years &rarr; 2 x (3+5) = 16 kg; 10 years &rarr; 4 x 10 = 40 kg. (Age exactly 5 is covered by the 1-5 formula: 2 x 10 = 20 kg = 4 x 5, so both formulas agree.)` }
          ] }
      ] },
    { title: `Final Exam 2023/2024 (May, second term sitting)`, meta: `May 2024 · CS206 · 2nd CS (New Cr) · 2 hours · 60 marks · Dr. M. AbdelFattah, Dr. M. Awad`, note: `Transcribed from two rotated phone photos (code boxes were enlarged to read them). The Q1 MCQs are the same bank as 2024/25 in a different order. Student key (Abdullah Elwan): 1 strong, 2 C, 3 C, 4 C, 5 A, 6 C, 7 B, 8 A, 9 A, 10 C, 11 C, 12 A, 13 A, 14 D, 15 C, 16 A, 17 C, 18 B, 19 B, 20 B, which agrees with the answers here. Disagreements in Q2(b): in (i) the paper writes function LSS{ without parentheses (a syntax error, so as printed nothing runs); the student gives the intended sum 20 for inputs 15 and 5. In (iii) the 6th log line on the paper uses "-" instead of "+", which prints NaN; the student assumed "+". The tax question is solved with the flat rate of the bracket applied to the whole income, as the question states.`, sections: [
        { title: `Question 1 · Choose the correct answer`, marks: `20 marks`, items: [
            { type: `mcq`, q: `Choose the correct HTML element to define important text`, o: [`&lt;i&gt;`, `&lt;strong&gt;`, `&lt;b&gt;`, `&lt;important&gt;`], a: 1, why: `&lt;strong&gt; defines important text; &lt;b&gt; is only visual bold (L3).` },
            { type: `mcq`, q: `What is the correct HTML for inserting an image?`, o: [
                `&lt;img alt="MyImage"&gt;image.gif&lt;/img&gt;`,
                `&lt;image src="image.gif" alt="MyImage"&gt;`,
                `&lt;img src="image.gif" alt="MyImage"&gt;`,
                `&lt;img href="image.gif" alt="MyImage"&gt;`
              ], a: 2, why: `&lt;img&gt; is an empty element with src (path) and alt (alternate text) (L2).` },
            { type: `mcq`, q: `Which of these elements are all &lt;table&gt; elements?`, o: [`&lt;table&gt;&lt;head&gt;&lt;tfoot&gt;`, `&lt;table&gt;&lt;tr&gt;&lt;tt&gt;`, `&lt;table&gt;&lt;tr&gt;&lt;td&gt;`, `&lt;thead&gt;&lt;body&gt;&lt;tr&gt;`], a: 2, why: `table, tr (row) and td (cell) are all table elements; &lt;head&gt;, &lt;tt&gt;, &lt;body&gt; are not (L5).` },
            { type: `mcq`, q: `How do you add a background color for all &lt;h1&gt; elements?`, o: [`h1.all {background-color:#FFFFFF;}`, `all.h1 {background-color:#FFFFFF;}`, `h1 {background-color:#FFFFFF;}`, `None of the above`], a: 2, why: `The element selector h1 targets every &lt;h1&gt;; h1.all would need class="all" (L4).` },
            { type: `mcq`, q: `Which property is used to change the font of an element?`, o: [`font-family`, `font-weight`, `font-style`, `font-property`], a: 0, why: `font-family sets the font; font-weight = boldness, font-style = italic (L3/L4).` },
            { type: `mcq`, q: `How can you make a bulleted list?`, o: [`&lt;list&gt;`, `&lt;ol&gt;`, `&lt;ul&gt;`, `&lt;dl&gt;`], a: 2, why: `&lt;ul&gt; is the unordered (bulleted) list; &lt;ol&gt; is numbered (L5).` },
            { type: `mcq`, q: `Which doctype is correct for HTML5?`, o: [`&lt;!DOCTYPE HTML5&gt;`, `&lt;!DOCTYPE html&gt;`, `&lt;!DOCTYPE&gt;`, `None`], a: 1, why: `The HTML5 declaration is &lt;!DOCTYPE html&gt; (L2).` },
            { type: `mcq`, q: `Which property is used to change the background color?`, o: [`background-color`, `Color`, `bgcolor`, `None`], a: 0, why: `background-color is the CSS property; color is the text color; bgcolor is an obsolete attribute (L3).` },
            { type: `mcq`, q: `Relative URLs are used to`, o: [`link other pages within the same site`, `link the same page with other sites`, `link other pages with other sites`, `does not link`], a: 0, why: `A relative URL has no domain, so it points inside the same site (L2).` },
            { type: `mcq`, q: `Which HTML tag is used to display the power in expression`, o: [`&lt;p&gt;`, `&lt;sub&gt;`, `&lt;sup&gt;`, `None of the above`], a: 2, why: `&lt;sup&gt; (superscript) raises text half a character; &lt;sub&gt; is for H2O (L3).` },
            { type: `mcq`, q: `What will be the output of the following code snippet?<pre>(function (a) { return (function () { console.log(a); a = 6; })() })(21);</pre>`, o: [`6`, `NaN`, `21`, `None of the above`], a: 2, why: `The inner function prints the outer a (21) through closure before assigning 6. Verified with node (L9).` },
            { type: `mcq`, q: `Which function is used to serialize an object into a JSON string in Javascript?`, o: [`stringify()`, `parse()`, `convert()`, `None of the above`], a: 0, why: `JSON.stringify() converts an object to a JSON string; JSON.parse() does the reverse (L9).` },
            { type: `mcq`, q: `How can a datatype be declared to be a constant type?`, o: [`const`, `var`, `let`, `constant`], a: 0, why: `const declares a constant that cannot be reassigned (L7).` },
            { type: `mcq`, q: `Which of the following methods can be used to display data in some form using Javascript?`, o: [`document.write()`, `console.log()`, `window.alert()`, `All of the above`], a: 3, why: `All are JS output methods (with innerHTML) (L7).` },
            { type: `mcq`, q: `Which of the following methods is used to access HTML elements using Javascript?`, o: [`getElementbyId()`, `getElementsByClassName()`, `Both A and B`, `None of the above`], a: 2, why: `Both are DOM methods for accessing elements (L7).` },
            { type: `mcq`, q: `Javascript is an _______ language?`, o: [`Object-Oriented`, `Object-Based`, `Procedural`, `None of the above`], a: 0, why: `The course MCQ sheet (Sanfoundry) gives Object-Oriented: JS is a prototype-based object-oriented language. Some books say object-based; answer A as the key does.` },
            { type: `mcq`, q: `How to define a function in PHP?`, o: [
                `functionName(parameters) {function body}`,
                `function {function body}`,
                `function functionName(parameters) {function body}`,
                `data type functionName(parameters) {function body}`
              ], a: 2, why: `PHP functions start with the keyword function, then the name and parameters (L10).` },
            { type: `mcq`, q: `Which is the right way of declaring a variable in PHP?`, o: [`$3hello`, `$_hello`, `$this`, `$5_Hello`], a: 1, why: `After $ a name must start with a letter or underscore; $this is reserved (L10).` },
            { type: `mcq`, q: `What will be the output of the following PHP code?<pre>&lt;?php define("GREETING", "PHP is a scripting language"); echo $GREETING; ?&gt;</pre>`, o: [`$GREETING`, `no output`, `PHP is a scripting language`, `GREETING`], a: 1, why: `Constants are used without $: echo GREETING; would print the text. $GREETING is an undefined variable, so nothing is echoed (PHP 8 also raises an "Undefined variable" warning if errors are displayed) (L10).` },
            { type: `mcq`, q: `What will be the output of the following PHP code?<pre>&lt;?php
define("GREETING", "PHP is a scripting language");
echo $GREETING;
?&gt;</pre>`, o: [`$GREETING`, `no output`, `PHP is a scripting language`, `GREETING`], a: 1, why: `Same as the previous question written on several lines: $GREETING is an undefined variable, so there is no output (L10).` }
          ] },
        { title: `Question 2 · Theory and code output`, marks: `20 marks`, items: [
            { type: `written`, q: `(a)(i) [4 marks] The main differences between inline and block elements. Give an example for each.`, ans: `<table><tr><th>Block-level</th><th>Inline</th></tr><tr><td>Always starts on a new line</td><td>Does not start on a new line</td></tr><tr><td>Takes the full width available (100% of the parent)</td><td>Takes only as much width as necessary</td></tr><tr><td>Width/height can be set</td><td>Width/height not allowed</td></tr><tr><td>Has top and bottom margins</td><td>No top/bottom margin</td></tr><tr><td>Example: &lt;div&gt; (also p, h1-h6, ul, table, form)</td><td>Example: &lt;span&gt; (also a, b, img, input)</td></tr></table>Example: <code>&lt;div style="border:1px solid black"&gt;Hello World&lt;/div&gt;</code> draws a box across the whole line, while <code>&lt;p&gt;This is an inline &lt;span style="border:1px solid black"&gt;Hello World&lt;/span&gt; element&lt;/p&gt;</code> boxes only the words. (L6)` },
            { type: `written`, q: `(a)(ii) [4 marks] The characteristic of Server-Side web programming. Why do we use PHP language?`, ans: `Characteristics: (1) dynamically edit, change or add any content to a web page; (2) respond to user queries or data submitted from HTML forms; (3) access any data or databases and return the results to a browser; (4) customize a web page for individual users; (5) provide security since server code cannot be viewed from a browser.<br>Why PHP: free and open source, compatible (19 million websites by November 2006), simple; it makes pages dynamic, works with databases and e-mail, authenticates users and processes form data. (L10)` },
            { type: `written`, q: `(b)(i) [4 marks] What is the output of the following HTML/JavaScript code segment?<pre>&lt;html&gt;
&lt;head&gt;
&lt;style&gt;
#l1 {background-color: yellow;}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;form&gt;
&lt;h4&gt; Par1: &lt;input type="text" id="X" placeholder="NNNN"&gt;&lt;/h4&gt;
&lt;h4&gt; Par2: &lt;input type="text" id="Y" placeholder="MMMM"&gt;&lt;/h4&gt;
&lt;input type="button" onkeydown="LSS()" value="PR"&gt;
&lt;h3&gt;Result: &lt;label id="RR"&gt;---&lt;/label&gt;&lt;/h3&gt;
&lt;/form&gt;
&lt;script&gt;
function LSS{
let A=document.getElementById('X').value;
let AA=document.getElementById('Y').value;
document.getElementById("RR").innerHTML = Number(A)+Number(AA);
}
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>`, ans: `<b>As printed, nothing is computed:</b> <code>function LSS{</code> has no parentheses, which is a <b>SyntaxError</b>, so the whole script is rejected and LSS is never defined. The page only shows: "Par1:" with an empty box (placeholder NNNN), "Par2:" with an empty box (placeholder MMMM), a button labelled <b>PR</b>, and "Result: ---". The style <code>#l1</code> matches no element, so nothing is yellow.<br><b>Intended answer</b> (with <code>function LSS()</code>): A and AA are the two typed strings, Number() converts them and the label RR shows their numeric sum, e.g. 15 and 5 &rarr; Result: <b>20</b> (with "+" alone it would concatenate to "155"). Note the handler is <code>onkeydown</code>, so it runs when a key is pressed while the PR button has focus (e.g. Tab to it and press Enter/Space), not on a mouse click.` },
            { type: `written`, q: `(b)(ii) [4 marks] What is the output of the following PHP code segment?<pre>&lt;?php
Function XXX ($x, $y)
{
  $a = explode(' ', trim($x));
  $b = explode(' ', trim($y));
  foreach ($a as $key =&gt; $value) {
    $output[$key] = $a[$key] * $b[$key];
  }
  return implode(' ', $output);
}
echo XXX(("10 12 3"), ("1 3 3"))."\\n";
?&gt;</pre>`, ans: `<b>Output:</b> <code>10 36 9</code> (followed by a newline).<br><b>Why:</b> explode splits "10 12 3" into [10,12,3] and "1 3 3" into [1,3,3]; foreach multiplies corresponding elements: 10*1 = 10, 12*3 = 36, 3*3 = 9; implode joins them with spaces. (Sheet 3 PHP, exercise 7.)` },
            { type: `written`, q: `(b)(iii) [4 marks] What is the output of the following JavaScript code segment?<pre>&lt;script type="text/javascript"&gt;
let nums = [3, 5, 7, 9, 11];
nums.unshift(55, 66);
console.log('unshift:' + nums);
console.log('pop:' + nums.pop());
console.log('slice:' + nums.slice(0,3));
console.log('splice: ' + nums.splice(0,1));
console.log('splice(0,2,111,222): ' + nums.splice(0,2,111,222));
console.log('slice(0,3): ' - nums.slice(0,3));
let x = [22,66,11,77,33,55,44];
console.log('includes(88, 0): ' + x.includes(88, 0));
console.log("x.join('-'): " + x.join('-'));
&lt;/script&gt;</pre>`, ans: `<pre>unshift:55,66,3,5,7,9,11
pop:11
slice:55,66,3
splice: 55
splice(0,2,111,222): 66,3
NaN
includes(88, 0): false
x.join('-'): 22-66-11-77-33-55-44</pre><b>Why:</b> unshift adds 55,66 at the front; pop removes and returns 11 &rarr; [55,66,3,5,7,9]; slice(0,3) copies 55,66,3; splice(0,1) removes 55; splice(0,2,111,222) removes 66,3 and inserts 111,222 &rarr; [111,222,5,7,9]. The line printed on the paper uses <b>minus</b>: <code>'slice(0,3): ' - nums.slice(0,3)</code> is a string minus an array = <b>NaN</b>. If it is a typo for "+", it prints <code>slice(0,3): 111,222,5</code> (the student key gives this). 88 is not in x, and join('-') joins with dashes (verified with node).` }
          ] },
        { title: `Question 3 · Design`, marks: `20 marks`, items: [
            { type: `written`, q: `(a) [10 marks] Write a JavaScript FUNCTION to compute a tax amount for an employee. The function should request Total annual income and display tax percent and tax amount using window input/output methods. The function should be repeated for N employees and store each tax percent for all employees in the JavaScript storage. Table (total annual income &rarr; tax percent): 0 to 70,000 LE &rarr; 0%; 70,001 to 200,000 &rarr; 20%; 200,001 to 400,000 &rarr; 22.5%; 400,001 to 1,200,000 &rarr; 25%; more than 1,200,000 &rarr; 27%.`, ans: `<pre>&lt;script&gt;
function taxPercent(income) {                 // flat percent from the table
  if (income &lt;= 70000)   return 0;
  if (income &lt;= 200000)  return 20;
  if (income &lt;= 400000)  return 22.5;
  if (income &lt;= 1200000) return 25;
  return 27;                                   // more than 1,200,000 LE
}
function computeTax() {
  let N = parseInt(window.prompt("Enter the number of employees:"));
  let all = [];
  for (let k = 1; k &lt;= N; k++) {
    let income = parseFloat(window.prompt("Employee " + k + ": total annual income (LE):"));
    let p = taxPercent(income);
    let amount = income * p / 100;
    window.alert("Employee " + k + "\\nTax percent = " + p + "%\\nTax amount = " + amount + " LE");
    all.push({ employee: k, income: income, percent: p, tax: amount });
    localStorage.setItem("employee" + k, p + "% : " + amount);
  }
  localStorage.setItem("allTaxes", JSON.stringify(all));
}
computeTax();
&lt;/script&gt;</pre>Example: income 300,000 LE &rarr; 22.5% &rarr; tax = 67,500 LE; income 50,000 &rarr; 0% &rarr; 0 LE.` },
            { type: `written`, q: `(b) [10 marks] Design the following login form using HTML & PHP. The form should validate username and password fields to not be blank. Additionally, the form action has to display a message on the web page to say "welcome user name" using appropriate PHP method. (Form: "welcome in myform", Username, Password, Login.)`, ans: `This is the L10 login example: POST is used so the password does not appear in the URL.<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;Login&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
&lt;form action="" method="post"&gt;
  &lt;h3&gt;welcome in myform&lt;/h3&gt;
  &lt;label for="username"&gt;Username:&lt;/label&gt;
  &lt;input type="text" id="username" name="username"&gt;&lt;br&gt;
  &lt;label for="password"&gt;Password:&lt;/label&gt;
  &lt;input type="password" id="password" name="password"&gt;&lt;br&gt;
  &lt;input type="submit" value="Login"&gt;
&lt;/form&gt;
&lt;?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty(trim($_POST["username"]))) {
        echo "Username is required";
    } elseif (empty(trim($_POST["password"]))) {
        echo "Password is required";
    } else {
        $username = htmlspecialchars(trim($_POST["username"]));
        echo "welcome $username";
    }
}
?&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>` }
          ] }
      ] },
    { title: `Final Exam 2023/2024`, meta: `January 2024 · CS206 · 2nd CS (New Cr) · 2 hours · 60 marks · Dr. M. AbdelFattah, Dr. M. Awad`, note: `Transcribed from two photos; the "summer 2023/2024" photos in the folder are the same January paper (same header and questions), so it is listed once. A handwritten answer sheet exists (3 pages, Q1, Q2(a) and Q2(b)(i)-(iii)) and its MCQ answers agree with this key. Where the key and a strict run differ: Q2(b)(ii) uses nums, which is not declared in that script, so a real run stops with a ReferenceError at the concat line (the key ignores nums and prints x joined with y); Q2(b)(iii) defines pr but never calls it, so strictly there is no output (the key traces it as if called: Y, XY, YXY, XYXY, YXYXY). Q1-17: the call is commented out and options A and C are identical; the intended answer is [111, 44, 1, 22]. Q1-16 accepts // (the key), although /* */ is also valid JavaScript. The student JS.txt and php.txt solutions for Q3 are in the folder; php.txt divides by 2*$a without brackets (/2*$a), which multiplies by a instead of dividing; the model answer below fixes it.`, sections: [
        { title: `Question 1 · Choose the correct answer`, marks: `20 marks`, items: [
            { type: `mcq`, q: `Which property is used to change the font of an element?`, o: [`font-family`, `font-weight`, `font-style`, `font-property`], a: 0, why: `font-family sets the font; font-weight = boldness, font-style = italic (L3/L4).` },
            { type: `mcq`, q: `How do you make a list that lists its items with squares?`, o: [`list: square;`, `list-type: square;`, `list-style-type: square;`, `None of the above`], a: 2, why: `list-style-type sets the list marker (disc, circle, square, none) (L5).` },
            { type: `mcq`, q: `Which is the right way of declaring a variable in PHP?`, o: [`$3hello`, `$_hello`, `$this`, `$5_Hello`], a: 1, why: `After $ a name must start with a letter or underscore; $this is reserved (L10).` },
            { type: `mcq`, q: `How can you make a bulleted list?`, o: [`&lt;list&gt;`, `&lt;ol&gt;`, `&lt;ul&gt;`, `&lt;dl&gt;`], a: 2, why: `&lt;ul&gt; is the unordered (bulleted) list; &lt;ol&gt; is numbered (L5).` },
            { type: `mcq`, q: `Choose the correct HTML element to define important text`, o: [`&lt;i&gt;`, `&lt;strong&gt;`, `&lt;b&gt;`, `&lt;important&gt;`], a: 1, why: `&lt;strong&gt; defines important text; &lt;b&gt; is only visual bold (L3).` },
            { type: `mcq`, q: `Which is the correct CSS syntax?`, o: [`{body;color:black;}`, `body:color=black;`, `body {color: black;}`, `{body:color=black;}`], a: 2, why: `selector {property: value;} (L4).` },
            { type: `mcq`, q: `What is the correct HTML for adding a background color?`, o: [`&lt;body style="background-color:yellow;"&gt;`, `&lt;background&gt;yellow&lt;/background&gt;`, `&lt;body bg="yellow"&gt;`, `None of the above`], a: 0, why: `Use the style attribute with background-color (L3).` },
            { type: `mcq`, q: `The tags in HTML are`, o: [`case-sensitive`, `in upper case`, `not case sensitive`, `in lowercase`], a: 2, why: `HTML is not case sensitive; only XHTML requires lowercase (L2/L6).` },
            { type: `mcq`, q: `What will be the output of the following PHP code?<pre>&lt;?php define("GREETING", "PHP is a scripting language"); echo $GREETING; ?&gt;</pre>`, o: [`$GREETING`, `no output`, `PHP is a scripting language`, `GREETING`], a: 1, why: `Constants are used without $: echo GREETING; would print the text. $GREETING is an undefined variable, so nothing is echoed (PHP 8 also raises an "Undefined variable" warning if errors are displayed) (L10).` },
            { type: `mcq`, q: `The visible part of HTML document lies in`, o: [`Paragraph tag`, `Body tag`, `Links tag`, `Image tag`], a: 1, why: `The visible content is between &lt;body&gt; and &lt;/body&gt; (L2).` },
            { type: `mcq`, q: `Relative URLs are used to`, o: [`link other pages within the same site`, `link the same page with other sites`, `link other pages with other sites`, `does not link`], a: 0, why: `A relative URL has no domain, so it points inside the same site (L2).` },
            { type: `mcq`, q: `Which of these elements are all &lt;table&gt; elements?`, o: [`&lt;table&gt;&lt;head&gt;&lt;tfoot&gt;`, `&lt;table&gt;&lt;tr&gt;&lt;tt&gt;`, `&lt;table&gt;&lt;tr&gt;&lt;td&gt;`, `&lt;thead&gt;&lt;body&gt;&lt;tr&gt;`], a: 2, why: `table, tr (row) and td (cell) are all table elements; &lt;head&gt;, &lt;tt&gt;, &lt;body&gt; are not (L5).` },
            { type: `mcq`, q: `How to define a function in PHP?`, o: [
                `functionName(parameters) {function body}`,
                `function {function body}`,
                `function functionName(parameters) {function body}`,
                `data type functionName(parameters) {function body}`
              ], a: 2, why: `PHP functions start with the keyword function, then the name and parameters (L10).` },
            { type: `mcq`, q: `Which function is used to serialize an object into a JSON string in Javascript?`, o: [`stringify()`, `parse()`, `convert()`, `None of the above`], a: 0, why: `JSON.stringify() converts an object to a JSON string; JSON.parse() does the reverse (L9).` },
            { type: `mcq`, q: `What will be the output of the following code snippet?<pre>a = [1, 2, 3, 4, 5];
print(a.slice(2, 4));</pre>`, o: [`3, 4`, `2, 3`, `3, 4, 5`, `2, 3, 4`], a: 0, why: `slice(2, 4) returns indexes 2 and 3 = [3, 4] (L8).` },
            { type: `mcq`, q: `How do we write a comment in javascript?`, o: [`/* */`, `//`, `#`, `$ $`], a: 1, why: `// is the key answer (single-line comment). Note /* */ is also a valid JS comment (multi-line), so A is not really wrong; choose B as the key does (L7).` },
            { type: `mcq`, q: `What will be the output of the following code snippet?<pre>function solve(arr, rotations) {
  if (rotations == 0) return arr;
  for (let i = 0; i &lt; rotations; i++) {
    let element = arr.pop();
    arr.unshift(element);
  }
  return arr;
}
// solve([44, 1, 22, 111], 5);</pre>`, o: [`[111, 44, 1, 22]`, `[44, 1, 22, 111]`, `[111, 44, 1, 22]`, `[1, 22, 111, 44]`], a: 0, why: `5 right-rotations on 4 elements equal 1 rotation: pop 111 and unshift it &rarr; [111, 44, 1, 22] (verified with node). A and C are printed identically; the key gives A. Strictly, the call is commented out so nothing would print.` },
            { type: `mcq`, q: `How can a datatype be declared to be a constant type?`, o: [`const`, `var`, `let`, `constant`], a: 0, why: `const declares a constant that cannot be reassigned (L7).` },
            { type: `mcq`, q: `Which of the following methods can be used to display data in some form using Javascript?`, o: [`document.write()`, `console.log()`, `window.alert()`, `All of the above`], a: 3, why: `All are JS output methods (with innerHTML) (L7).` },
            { type: `mcq`, q: `Which of the following methods is used to access HTML elements using Javascript?`, o: [`getElementbyId()`, `getElementsByClassName()`, `Both A and B`, `None of the above`], a: 2, why: `Both are DOM methods for accessing elements (L7).` }
          ] },
        { title: `Question 2 · Theory and code output`, marks: `20 marks`, items: [
            { type: `written`, q: `(a)(i) [4 marks] The main differences between HTML and XHTML.`, ans: `XHTML (EXtensible HyperText Markup Language) is a stricter, XML-based version of HTML (HTML defined as an XML application) with strict error handling; browsers tolerate errors in HTML. The most important differences: (1) &lt;!DOCTYPE&gt; is mandatory; (2) the xmlns attribute in &lt;html&gt; is mandatory; (3) &lt;html&gt;, &lt;head&gt;, &lt;title&gt; and &lt;body&gt; are mandatory; (4) elements must always be properly nested (&lt;b&gt;&lt;i&gt;text&lt;/i&gt;&lt;/b&gt;); (5) elements must always be closed, including empty ones (&lt;br /&gt;, &lt;img ... /&gt;); (6) elements must be in lowercase; (7) attribute names must be in lowercase; (8) attribute values must always be quoted. (L6)` },
            { type: `written`, q: `(a)(ii) [4 marks] The advantages and limitations of JavaScript language.`, ans: `<b>Advantages</b>: less server interaction (validate input before sending, less server load); immediate feedback to visitors (no page reload); increased interactivity (react to mouse hover/keyboard); richer interfaces (drag-and-drop, sliders).<br><b>Limitations</b>: client-side JS cannot read or write files (security); it cannot be used for networking applications; it has no multithreading or multiprocessor capabilities. It is a lightweight interpreted language for adding interactivity to static pages. (L7)` },
            { type: `written`, q: `(b)(i) [3 marks] What is the output of the following code?<pre>&lt;?php
Function MXX($m, $n)
{
  $ds = (int)($m/$n);
  return $m - $n * $ds;
}
echo MXX(13,2)."\\n";
echo MXX(81,3)."\\n";</pre>`, ans: `<b>Output:</b> 1 then 0 (each followed by "\\n"; in a browser they appear as "1 0").<br><b>Why:</b> MXX computes the remainder without %: MXX(13,2): ds = (int)(6.5) = 6, 13 - 2*6 = <b>1</b>. MXX(81,3): ds = 27, 81 - 3*27 = <b>0</b>. (Sheet 3 PHP exercise 3; matches the student key.)` },
            { type: `written`, q: `(b)(ii) [3 marks] What is the output of the following JavaScript code?<pre>&lt;script type="text/javascript"&gt;
let x = [22,66,11,77,33,55,44];
console.log(x);
console.log('indexOf(33,2): ' + x.indexOf(33, 2));
console.log('LastIndexOf(33,-1): ' + x.lastIndexOf(33, -1));
console.log('includes(33, 2): ' + x.includes(33, 2));
console.log('includes(88, 0): ' + x.includes(88, 0));
let y = [99,77,88];
console.log('x.concat(nums,y): ' + x.concat(nums,y));
console.log('x.sort(): ' + x.sort());
console.log('x.reverse(): ' + x.reverse());
console.log('x.join(): ' + x.join());
console.log("x.join('-'): " + x.join('-'));
&lt;/script&gt;</pre>`, ans: `<pre>[22, 66, 11, 77, 33, 55, 44]
indexOf(33,2): 4
LastIndexOf(33,-1): 4
includes(33, 2): true
includes(88, 0): false
Uncaught ReferenceError: nums is not defined</pre><b>Why:</b> 33 is at index 4 (searching from 2, and backwards from the last element); includes finds 33 but not 88. In this script <b>nums is never declared</b>, so <code>x.concat(nums,y)</code> throws a ReferenceError and the remaining lines do not run (verified with node).<br><b>If the examiner meant <code>x.concat(y)</code></b> (as the student key assumes), the rest is: <code>x.concat(nums,y): 22,66,11,77,33,55,44,99,77,88</code>, <code>x.sort(): 11,22,33,44,55,66,77</code>, <code>x.reverse(): 77,66,55,44,33,22,11</code>, <code>x.join(): 77,66,55,44,33,22,11</code>, <code>x.join('-'): 77-66-55-44-33-22-11</code> (concat does not change x; sort and reverse do).` },
            { type: `written`, q: `(b)(iii) [3 marks] What is the output of the following JavaScript code?<pre>&lt;script&gt;
let pr = _ =&gt; {
  var p, s = "";
  for (let x = 1; x &lt; 6; x++) {
    p = x % 2 == 0 ? 'X' : 'Y';
    s = p + s;
    console.log(s); } }
&lt;/script&gt;</pre>`, ans: `<b>As written, there is no output</b>: the arrow function pr is only defined, never called (no <code>pr();</code>).<br>If it is called, it logs:<pre>Y
XY
YXY
XYXY
YXYXY</pre><b>Why:</b> for x = 1..5, p is "X" when x is even and "Y" when odd, and <code>s = p + s</code> adds p to the <b>front</b>: x=1 Y; x=2 XY; x=3 YXY; x=4 XYXY; x=5 YXYXY (verified with node; the student key traces it this way).` },
            { type: `written`, q: `(b)(iv) [3 marks] What is the output of the following JavaScript code?<pre>&lt;script&gt;
var S1 = {
  name: 'Ali',
  age: 20,
  getName: function() {
    return this.name;
  }};
S1['name'] = 'omer';
console.log(S1.getName());
var S2;
S2 = Object.create(S1, {class:{value:1}});
S2.name = 'Ahmed';
S2['age'] = 18;
console.log(S2.age);
let Sclass = Object.assign(S1, S2, {status:'M'});
console.log(Sclass);
&lt;/script&gt;</pre>`, ans: `<pre>omer
18
{ name: 'Ahmed', age: 18, getName: [Function: getName], status: 'M' }</pre><b>Why:</b> S1.name is changed to "omer", so S1.getName() returns <b>omer</b>. S2 is created with S1 as its prototype plus a non-enumerable own property class = 1; assigning S2.name and S2.age creates own properties, so S2.age is <b>18</b>. Object.assign(S1, S2, {status:'M'}) copies S2's own enumerable properties (name, age; not class) and status into <b>S1</b> and returns S1, so Sclass is S1 = {name: "Ahmed", age: 18, getName: f, status: "M"} (verified with node). (The paper prints <code>console.log(S1.getName(),</code> with a comma; it is read as a closing parenthesis.)` }
          ] },
        { title: `Question 3 · Design`, marks: `20 marks`, items: [
            { type: `written`, q: `(a) [10 marks] Write a JavaScript FUNCTION to compute a gpa {A, B, C, D+, D, F} and its corresponding grade {Ex, VG, G, S+, S, F} respectively from six subject scores. The function should request six scores and display its grade and gpa using window input/output methods. The function should be repeated for N students and store each gpa for all students in the JavaScript storage. [Hint: let subject scores S(i), i = 0..5, av = &Sigma;S(i)/6, gpa = av/25, and each grade is represented as 10% from the av except F from 0 to 49%. Each subject is from 100 marks.]`, ans: `So A = 90-100, B = 80-89, C = 70-79, D+ = 60-69, D = 50-59, F = 0-49 (the same ranges as L9 Example 1).<pre>&lt;script&gt;
function calcGrade() {
  let N = parseInt(window.prompt("Enter the number of students:"));
  let all = [];
  for (let st = 1; st &lt;= N; st++) {
    let sum = 0;
    for (let i = 0; i &lt;= 5; i++) {                     // S(i), i = 0..5
      sum += Number(window.prompt("Student " + st + ": subject [" + i + "] mark from 100:"));
    }
    let av = sum / 6;                                   // average
    let gpa = av / 25;                                  // gpa = av / 25
    let grade;
    if (av &gt;= 90)      grade = "A (Ex)";
    else if (av &gt;= 80) grade = "B (VG)";
    else if (av &gt;= 70) grade = "C (G)";
    else if (av &gt;= 60) grade = "D+ (S+)";
    else if (av &gt;= 50) grade = "D (S)";
    else               grade = "F (F)";                 // 0 to 49
    window.alert("Student " + st + ": Grade = " + grade + ", GPA = " + gpa.toFixed(2));
    all.push(gpa.toFixed(2));
    localStorage.setItem("student" + st, gpa.toFixed(2));
  }
  localStorage.setItem("allGPA", JSON.stringify(all));
}
calcGrade();
&lt;/script&gt;</pre>Example: marks 90, 80, 70, 85, 95, 60 &rarr; av = 480/6 = 80 &rarr; grade B (VG), gpa = 80/25 = 3.2.<br>The student JS.txt solution adds the prompt strings directly (sum += grades[j]), which concatenates strings; the marks must be converted with Number() or parseFloat() first.` },
            { type: `written`, q: `(b) [10 marks] Design the following Solver form using HTML & PHP with validations on Quadratic Equation (QE) Coefficients (a, b, c) fields that should not be blank. Additionally, the form action is to display QE roots (X1, X2) on the web page using appropriate PHP method. [Hint: QE is f(x) = ax<sup>2</sup> + bx + c and the roots are X1,2 = (-b &plusmn; &radic;(b<sup>2</sup> - 4ac)) / 2a]`, ans: `<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;QE Solver&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
&lt;form action="" method="post"&gt;
  &lt;h3&gt;QE Solver&lt;/h3&gt;
  Coefficient(a): &lt;input type="text" name="a"&gt;&lt;br&gt;
  Coefficient(b): &lt;input type="text" name="b"&gt;&lt;br&gt;
  Coefficient(c): &lt;input type="text" name="c"&gt;&lt;br&gt;
  &lt;input type="submit" value="Solve"&gt;
&lt;/form&gt;
&lt;?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $a = trim($_POST["a"]); $b = trim($_POST["b"]); $c = trim($_POST["c"]);
    if ($a === "" || $b === "" || $c === "") {
        echo "All coefficients are required.";
    } elseif (!is_numeric($a) || !is_numeric($b) || !is_numeric($c)) {
        echo "Coefficients must be numbers.";
    } elseif ($a == 0) {
        echo "a must not be 0 (not a quadratic equation).";
    } else {
        $d = $b * $b - 4 * $a * $c;                      // discriminant
        if ($d &lt; 0) {
            echo "No real roots (discriminant &lt; 0).";
        } else {
            $x1 = (-$b + sqrt($d)) / (2 * $a);           // note the brackets
            $x2 = (-$b - sqrt($d)) / (2 * $a);
            echo "X1 = $x1 &lt;br&gt; X2 = $x2";
        }
    }
}
?&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>Example: a = 1, b = -3, c = 2 &rarr; discriminant = 9 - 8 = 1 &rarr; X1 = (3 + 1)/2 = 2, X2 = (3 - 1)/2 = 1. Brackets around (2 * $a) are essential: /2*$a would divide by 2 and then multiply by a.` }
          ] }
      ] },
    { title: `Midterm 2023/2024 (Forms A, B, C)`, meta: `First term (January) · CS 206 · one hour · 20 marks · Dr. M. AbdelFattah`, note: `Three versions of the midterm (photos A, B, C). Form C is partly cut off at the bottom of the photo (the last radio buttons). The file "2023_2024 midterm Answers.pdf" contains a student's HTML/CSS code for the Q3 pages (same file as "sheet-2"); the model answers below are written from the lectures. Pencil marks on Form B (Q2-C, Q3-B, Q4-C, Q5-D, Q7-B) match the key except Q5, where the marked option D {body:color=black;} is wrong; the correct syntax is C.`, sections: [
        { title: `Form A · Question 1 · Choose the correct answer`, marks: `7 marks`, items: [
            { type: `mcq`, q: `Choose the correct HTML element to define important text`, o: [`&lt;i&gt;`, `&lt;strong&gt;`, `&lt;b&gt;`, `&lt;important&gt;`], a: 1, why: `&lt;strong&gt; defines important text; &lt;b&gt; is only visual bold (L3).` },
            { type: `mcq`, q: `Which of these elements are all &lt;table&gt; elements?`, o: [`&lt;table&gt;&lt;head&gt;&lt;tfoot&gt;`, `&lt;table&gt;&lt;tr&gt;&lt;tt&gt;`, `&lt;table&gt;&lt;tr&gt;&lt;td&gt;`, `&lt;thead&gt;&lt;body&gt;&lt;tr&gt;`], a: 2, why: `table, tr (row) and td (cell) are all table elements; &lt;head&gt;, &lt;tt&gt;, &lt;body&gt; are not (L5).` },
            { type: `mcq`, q: `How can you make a bulleted list?`, o: [`&lt;list&gt;`, `&lt;ol&gt;`, `&lt;ul&gt;`, `&lt;dl&gt;`], a: 2, why: `&lt;ul&gt; is the unordered (bulleted) list; &lt;ol&gt; is numbered (L5).` },
            { type: `mcq`, q: `Which doctype is correct for HTML5?`, o: [`&lt;!DOCTYPE HTML5&gt;`, `&lt;!DOCTYPE html&gt;`, `&lt;!DOCTYPE&gt;`, `None`], a: 1, why: `The HTML5 declaration is &lt;!DOCTYPE html&gt; (L2).` },
            { type: `mcq`, q: `Which property is used to change the background color?`, o: [`background-color`, `Color`, `bgcolor`, `None`], a: 0, why: `background-color is the CSS property; color is the text color; bgcolor is an obsolete attribute (L3).` },
            { type: `mcq`, q: `Relative URLs are used to`, o: [`link other pages within the same site`, `link the same page with other sites`, `link other pages with other sites`, `does not link`], a: 0, why: `A relative URL has no domain, so it points inside the same site (L2).` },
            { type: `mcq`, q: `Which HTML tag is used to display the power in expression`, o: [`&lt;p&gt;`, `&lt;sub&gt;`, `&lt;sup&gt;`, `None of the above`], a: 2, why: `&lt;sup&gt; (superscript) raises text half a character; &lt;sub&gt; is for H2O (L3).` }
          ] },
        { title: `Form A · Questions 2 and 3`, marks: `13 marks`, items: [
            { type: `written`, q: `Q2 [5 marks] "There are many types of Web sites, each catering to a particular type of content or use." Mention and explain the types of Web Sites and the Internet protocols.`, ans: `<b>Types of web sites</b>: (1) Blog (web log): online diaries, may include discussion forums; (2) Social networking site: users communicate and share pictures, videos, music, blogs; may include games and web apps; (3) Wiki site: collaboratively edited (Wikipedia, WikiHow); (4) Web portal: a starting point or gateway to other resources; (5) Search engine site: gateway/lookup for other sites (Google, Yahoo, Bing); (6) Education site: teachers, students or administrators post school information.<br><b>Internet protocols</b>: TCP/IP: main protocol, the rules computers follow to communicate over a network; HTTP: exchanges almost all web resources, the browser's language to send requests (HTTPS is the secure, encrypted version); FTP: uploads/downloads files between client and server; (ISP: organization giving access to the Internet and services like e-mail). (L1)` },
            { type: `written`, q: `Q3 [8 marks] Write HTML code with CSS styles to design the following web page with the assumptions: 1- Use the CSS style for navigation menu from URL "https://www.mmm.com/html/styles.css". 2- Set single border line for both heading and table with (thickness = 10px, color = RED, solid, padding = 20px 40px and margin = 10px, 100px) and (thickness = 2px, color = BLUE, solid, padding = 2px and margin = 10px, 90px) respectively. The background color of the heading cells is gray with level 200. Write a comment before each object code. (Page: menu Home/News/Contact/About; heading "Scheduling Table"; table "Time Table Method" with Hours, SAT/MON/WED/THU, cells WP, Break, AI, Office Hrs, Theory, Lunch; notes WP: It's a Web-Programming course; Theory: It's a Theory of Computation course.)`, ans: `<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;!-- navigation menu style from the external URL --&gt;
&lt;link rel="stylesheet" href="https://www.mmm.com/html/styles.css"&gt;
&lt;style&gt;
  /* heading: 10px red solid border, padding 20px 40px, margin 10px 100px */
  h1 { border: 10px solid red; padding: 20px 40px; margin: 10px 100px; text-align: center; }
  /* table: single 2px blue solid border, padding 2px, margin 10px 90px */
  table { border: 2px solid blue; border-collapse: collapse; margin: 10px 90px; }
  th, td { border: 2px solid blue; padding: 2px; text-align: center; }
  /* heading cells gray with level 200 */
  th { background-color: rgb(200, 200, 200); }
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;!-- navigation menu --&gt;
&lt;ul&gt;
  &lt;li&gt;&lt;a href="#home"&gt;Home&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href="#news"&gt;News&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href="#contact"&gt;Contact&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href="#about"&gt;About&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;!-- heading --&gt;
&lt;h1&gt;Scheduling Table&lt;/h1&gt;
&lt;!-- table --&gt;
&lt;table&gt;
  &lt;tr&gt;&lt;th colspan="5"&gt;Time Table Method&lt;/th&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;th rowspan="6"&gt;Hours&lt;/th&gt;&lt;th&gt;SAT&lt;/th&gt;&lt;th&gt;MON&lt;/th&gt;&lt;th&gt;WED&lt;/th&gt;&lt;th&gt;THU&lt;/th&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td rowspan="2"&gt;WP&lt;/td&gt;&lt;td&gt;WP&lt;/td&gt;&lt;td rowspan="4"&gt;Office Hrs&lt;/td&gt;&lt;td&gt;Theory&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;AI&lt;/td&gt;&lt;td&gt;Office Hrs&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;Break&lt;/td&gt;&lt;td rowspan="2"&gt;Office Hrs&lt;/td&gt;&lt;td&gt;Theory&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;WP&lt;/td&gt;&lt;td&gt;Theory&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td colspan="4"&gt;Lunch&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;!-- description list --&gt;
&lt;dl&gt;
  &lt;dt&gt;WP:&lt;/dt&gt;     &lt;dd&gt;-It's a Web-Programming course.&lt;/dd&gt;
  &lt;dt&gt;Theory:&lt;/dt&gt; &lt;dd&gt;-It's a Theory of Computation course.&lt;/dd&gt;
&lt;/dl&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>Table check (5 columns): every row adds up to 5 when cells still covered by rowspan from above are counted (method in L5). "Single border" = border-collapse: collapse; "gray with level 200" = rgb(200, 200, 200).` }
          ] },
        { title: `Form B · Question 1 · Choose the correct answer`, marks: `7 marks`, items: [
            { type: `mcq`, q: `What is the correct HTML for adding a background color?`, o: [`&lt;body style="background-color:yellow;"&gt;`, `&lt;background&gt;yellow&lt;/background&gt;`, `&lt;body bg="yellow"&gt;`, `None of the above`], a: 0, why: `style attribute with background-color (L3).` },
            { type: `mcq`, q: `What is the correct HTML for creating a hyperlink?`, o: [
                `&lt;a&gt;http://www.google.com&lt;/a&gt;`,
                `&lt;a name="http://www.Google.com"&gt;Google.com&lt;/a&gt;`,
                `&lt;a href="http://www.Google.com"&gt;Google&lt;/a&gt;`,
                `&lt;a url="http://www.Google.com"&gt;Google.com&lt;/a&gt;`
              ], a: 2, why: `href holds the destination (L2).` },
            { type: `mcq`, q: `How can you make a numbered list?`, o: [`&lt;list&gt;`, `&lt;ol&gt;`, `&lt;ul&gt;`, `&lt;dl&gt;`], a: 1, why: `&lt;ol&gt; = ordered (numbered) list (L5).` },
            { type: `mcq`, q: `What is the correct HTML for inserting an image?`, o: [
                `&lt;img alt="MyImage"&gt;image.gif&lt;/img&gt;`,
                `&lt;image src="image.gif" alt="MyImage"&gt;`,
                `&lt;img src="image.gif" alt="MyImage"&gt;`,
                `&lt;img href="image.gif" alt="MyImage"&gt;`
              ], a: 2, why: `&lt;img&gt; is an empty element with src (path) and alt (alternate text) (L2).` },
            { type: `mcq`, q: `Which is the correct CSS syntax?`, o: [`{body;color:black;}`, `body:color=black;`, `body {color: black;}`, `{body:color=black;}`], a: 2, why: `selector {property: value;} (L4).`, key: `Pencil mark on the photo is on D, which is wrong.` },
            { type: `mcq`, q: `How do you add a background color for all &lt;h1&gt; elements?`, o: [`h1.all {background-color:#FFFFFF;}`, `all.h1 {background-color:#FFFFFF;}`, `h1 {background-color:#FFFFFF;}`, `None of the above`], a: 2, why: `The element selector h1 targets every &lt;h1&gt;; h1.all would need class="all" (L4).` },
            { type: `mcq`, q: `HTML is what type of language?`, o: [`Scripting Language`, `Markup Language`, `Programming Language`, `Network Protocol`], a: 1, why: `HyperText Markup Language (L2).` }
          ] },
        { title: `Form B · Questions 2 and 3`, marks: `13 marks`, items: [
            { type: `written`, q: `Q2 [5 marks] "There are many points one should keep in mind while designing a Web site. These points make a site usable and easily accessible to the users." Mention and explain the web-site designing issues.`, ans: `(1) <b>Information availability</b>: provide 80-90% of what the visitor is looking for. (2) <b>Page layout</b>: relevant content found quickly; simple pages. (3) <b>Colors</b>: standard colors, blue links, violet visited, red active. (4) <b>Web accessibility</b>: usable by people with visual, audio, physical or speech disabilities. (5) <b>User-friendly site</b>: built on audience needs (UI/UX). (6) <b>Download speed</b>: optimize graphics (images not larger than 10 KB), smaller pages, avoid nested tables. (L1)` },
            { type: `written`, q: `Q3 [8 marks] Write HTML code with CSS styles to design the following web page with the assumptions: 1- Use the CSS style for navigation menu from URL "https://www.mmm.com/html/styles.css". 2- Set single border line for both heading and table with thickness = 2px, color = blue and solid. The background color of the heading cells is gray with level 200. Write a comment before each object code. (Page: menu; heading "Student Assessment Methods"; table: Assessment Method / Marks / Percentage(%); Mid-Term Exam 20 20%; Year work (Quiz, Researches, Assignments, Participation) 10 10%; Practical exam and Project 10 10%; Final Exam 60 60%; Total 100 100%; then "My Equation is: R = X<sub>2</sub> - Y<sub>2</sub> + 5".)`, ans: `<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;!-- navigation menu style from the external URL --&gt;
&lt;link rel="stylesheet" href="https://www.mmm.com/html/styles.css"&gt;
&lt;style&gt;
  /* single 2px blue solid border for heading and table */
  h1 { border: 2px solid blue; text-align: center; }
  table, th, td { border: 2px solid blue; border-collapse: collapse; }
  /* heading cells gray with level 200 */
  th { background-color: rgb(200, 200, 200); }
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;!-- navigation menu --&gt;
&lt;ul&gt;
  &lt;li&gt;&lt;a href="#home"&gt;Home&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href="#news"&gt;News&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href="#contact"&gt;Contact&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href="#about"&gt;About&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;!-- heading --&gt;
&lt;h1&gt;Student Assessment Methods&lt;/h1&gt;
&lt;!-- table --&gt;
&lt;table style="width:100%"&gt;
  &lt;tr&gt;&lt;th colspan="2"&gt;Assessment Method&lt;/th&gt;&lt;th&gt;Marks&lt;/th&gt;&lt;th&gt;Percentage(%)&lt;/th&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td colspan="2"&gt;Mid-Term Exam&lt;/td&gt;&lt;td&gt;20&lt;/td&gt;&lt;td&gt;20%&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td rowspan="4"&gt;Year work&lt;/td&gt;&lt;td&gt;Quiz&lt;/td&gt;&lt;td rowspan="4"&gt;10&lt;/td&gt;&lt;td rowspan="4"&gt;10%&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;Researches&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;Assignments&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;Participation&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td colspan="2"&gt;Practical exam and Project&lt;/td&gt;&lt;td&gt;10&lt;/td&gt;&lt;td&gt;10%&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td colspan="2"&gt;Final Exam&lt;/td&gt;&lt;td&gt;60&lt;/td&gt;&lt;td&gt;60%&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;th colspan="2"&gt;Total&lt;/th&gt;&lt;th&gt;100&lt;/th&gt;&lt;th&gt;100%&lt;/th&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;!-- equation with subscripts --&gt;
&lt;p&gt;My Equation is: R = X&lt;sub&gt;2&lt;/sub&gt; - Y&lt;sub&gt;2&lt;/sub&gt; + 5&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>Check (4 columns): "Year work" spans 4 rows in column 1 while Quiz/Researches/Assignments/Participation fill column 2; Marks 10 and 10% each span the same 4 rows. The subscripts use &lt;sub&gt; (L3).` }
          ] },
        { title: `Form C · Question 1 · Choose the correct answer`, marks: `7 marks`, items: [
            { type: `mcq`, q: `Choose the correct HTML element for the largest heading:`, o: [`&lt;head&gt;`, `&lt;h1&gt;`, `&lt;heading&gt;`, `&lt;h6&gt;`], a: 1, why: `&lt;h1&gt; is the most important/largest heading (L2).` },
            { type: `mcq`, q: `&lt;a&gt; and &lt;/a&gt; are the tags used for:`, o: [`Adding image`, `Aligning text`, `Audio-voiced text`, `Adding links to your page`], a: 3, why: `The anchor element creates hyperlinks (L2).` },
            { type: `mcq`, q: `To start a list at the count of 3, use:`, o: [`&lt;ol begin="3"&gt;`, `&lt;ol list="3"&gt;`, `&lt;ol start="3"&gt;`, `&lt;ol num="3"&gt;`], a: 2, why: `The start attribute sets the first number (L5).` },
            { type: `mcq`, q: `The visible part of HTML document lies in:`, o: [`Paragraph tag`, `Body tag`, `Links tag`, `Image tag`], a: 1, why: `Visible content is inside &lt;body&gt; (L2).` },
            { type: `mcq`, q: `Which of the following will NOT be found in the section?`, o: [`&lt;Metatags&gt;`, `&lt;Table&gt;`, `&lt;Title&gt;`, `None of the above`], a: 1, why: `The question means the &lt;head&gt; section (the tag name was swallowed when printing). A table is body content; meta tags and title belong in the head (L2).` },
            { type: `mcq`, q: `How do you make a list that lists its items with squares?`, o: [`list: square;`, `list-type: square;`, `list-style-type: square;`, `None of the above`], a: 2, why: `list-style-type (L5).` },
            { type: `mcq`, q: `Which property is used to change the font of an element?`, o: [`font-family`, `font-weight`, `font-style`, `font-property`], a: 0, why: `font-family sets the font; font-weight = boldness, font-style = italic (L3/L4).` }
          ] },
        { title: `Form C · Questions 2 and 3`, marks: `13 marks`, items: [
            { type: `written`, q: `Q2 [5 marks] "Hyperlinks are the primary method used to navigate between pages and Web sites." Mention and explain the types of hyperlinks and illustrate the differences between web-page and web-site.`, ans: `<b>Types of hyperlinks</b>: Text hyperlink (a word or phrase takes visitors to another page, file or document); Image hyperlink (an image does the same); Bookmark hyperlink (text or an image takes visitors to another part of the same page); E-mail hyperlink (lets visitors send an e-mail to the displayed address).<br><b>Web page vs web site</b>: a web page is a single document, a space of information about a person, business, organization or cause, containing links to resources; a web site is a collection of web pages grouped together and connected in various ways, usually in one root folder with index.html as the home page. (L1)` },
            { type: `written`, q: `Q3 [8 marks] Write HTML code with CSS styles to design the following web page: the whole page has three blocks. Block#1 has a navigation menu with CSS style from URL "https://www.mmm.com/html/styles.css". Block#2 has a heading and a frame to show a hyperlink from Block#3 with CSS style (background color = cyan, center, thickness = [2px, solid red], height = 300px, width = 80%). Block#3 has a hyperlink surrounded by the symbol (code = 128512) to the Google site with CSS style (color = blue and bold) and a form containing three radio boxes to choose between (HTML, CSS, JavaScript). Write a comment before each object code.`, ans: `<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;!-- Block#1 navigation menu style from the external URL --&gt;
&lt;link rel="stylesheet" href="https://www.mmm.com/html/styles.css"&gt;
&lt;style&gt;
  /* Block#2 frame style */
  iframe { background-color: cyan; display: block; margin: auto;
           border: 2px solid red; height: 300px; width: 80%; }
  /* Block#3 link style */
  .glink { color: blue; font-weight: bold; }
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;!-- Block#1: navigation menu --&gt;
&lt;div&gt;
  &lt;ul&gt;
    &lt;li&gt;&lt;a href="#home"&gt;Home&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href="#news"&gt;News&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#contact"&gt;Contact&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href="#about"&gt;About&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;
&lt;!-- Block#2: heading and frame (target of the link in Block#3) --&gt;
&lt;div&gt;
  &lt;h2 style="text-align:center;"&gt;Iframe - Target for a Link&lt;/h2&gt;
  &lt;iframe src="demo_iframe.htm" name="iframe_a" title="Iframe Example"&gt;&lt;/iframe&gt;
&lt;/div&gt;
&lt;!-- Block#3: hyperlink surrounded by the symbol 128512, then a radio form --&gt;
&lt;div&gt;
  &lt;p&gt;&amp;#128512; &lt;a class="glink" href="https://www.google.com" target="iframe_a"&gt;Google.com&lt;/a&gt; &amp;#128512;&lt;/p&gt;
  &lt;form&gt;
    &lt;p&gt;Choose your favorite Web language&lt;/p&gt;
    &lt;input type="radio" id="html" name="fav" value="HTML"&gt;&lt;label for="html"&gt;HTML&lt;/label&gt;&lt;br&gt;
    &lt;input type="radio" id="css" name="fav" value="CSS"&gt;&lt;label for="css"&gt;CSS&lt;/label&gt;&lt;br&gt;
    &lt;input type="radio" id="js" name="fav" value="JavaScript"&gt;&lt;label for="js"&gt;JavaScript&lt;/label&gt;
  &lt;/form&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>Key points: the link's target equals the iframe's name (L6); &amp;#128512; is the emoji symbol by its decimal code (L6); radios share one name so only one can be chosen.` }
          ] }
      ] },
    { title: `Final Exam 2022/2023 (May / summer)`, meta: `May 2023 · CS206 · 2 hours · 60 marks · Dr. M. AbdelFattah, Dr. M. ElGamml`, note: `Transcribed from two phone photos. A fold crosses Q1(a) items 2 and 10: Q2 reads "What is the data type of null in JavaScript?" and Q10 reads console.log(1 + "2" + "2") (the middle "+" is hidden by the fold; the options 122/5/NaN/Error confirm it). In Q4 option (c) is smudged; it is the standard &lt;!-- and --&gt;. No key available; outputs were verified with node.`, sections: [
        { title: `Question 1 (a) · Choose the correct answer`, marks: `15 marks`, items: [
            { type: `mcq`, q: `Which of the following is a valid JavaScript variable name?`, o: [`123variable`, `_myVariable`, `var`, `break`], a: 1, why: `Names start with a letter, $ or _; var and break are reserved words (L7).` },
            { type: `mcq`, q: `What is the data type of null in JavaScript?`, o: [`Object`, `Null`, `Undefined`, `Null is not a valid data type in JavaScript`], a: 0, why: `typeof null returns "object" (a historic quirk), which is what this MCQ expects. Strictly, the language spec names the type Null, so B can be argued, but A is the usual exam answer.` },
            { type: `mcq`, q: `What is the result of typeof [1, 2, 3] in JavaScript?`, o: [`Array`, `Object`, `List`, `Undefined`], a: 1, why: `Arrays are objects: typeof gives "object" (L7).` },
            { type: `mcq`, q: `HTML comment should be enclosed between`, o: [`&lt;!- and --&gt;`, `&lt;! And !&gt;`, `&lt;!-- and --&gt;`, `&lt;! -- and --&gt;`], a: 2, why: `HTML comments are &lt;!-- ... --&gt; with no space after &lt;! (L3).` },
            { type: `mcq`, q: `Which of the following type of HTML tag is used to define an internal style sheet?`, o: [`&lt;script&gt;`, `&lt;link&gt;`, `&lt;class&gt;`, `&lt;style&gt;`], a: 3, why: `&lt;style&gt; in the head = internal CSS; &lt;link&gt; = external (L4).` },
            { type: `mcq`, q: `Which of the following CSS property is used to set the color of the text?`, o: [`text-decoration`, `pallet`, `text-style`, `color`], a: 3, why: `color sets the text color (L3).` },
            { type: `mcq`, q: `Which of the following CSS Property controls how an element is positioned?`, o: [`static`, `position`, `fix`, `set`], a: 1, why: `position (values static, relative, absolute, fixed, sticky) (L4).` },
            { type: `mcq`, q: `Which of the following is a valid way to concatenate two strings in JavaScript?`, o: [`str1 + str2`, `str1.concat(str2)`, `Both a) and b)`, `Neither a) nor b)`], a: 2, why: `Both + and concat() join strings (L9).` },
            { type: `mcq`, q: `What is the result of typeof true in JavaScript?`, o: [`True`, `Boolean`, `Object`, `Undefined`], a: 1, why: `"boolean" (L7).` },
            { type: `mcq`, q: `The output of console.log(1 + "2" + "2"); is?`, o: [`122`, `5`, `NaN`, `Error`], a: 0, why: `1 + "2" = "12", then "12" + "2" = "122" (verified with node) (L8).` },
            { type: `mcq`, q: `What is the output of this code?<pre>const numbers = [33, 2, 8];
numbers.sort();
console.log(numbers[1])</pre>`, o: [`33`, `2`, `8`, `1`], a: 0, why: `sort() compares as strings by default: "2" &lt; "33" &lt; "8", giving [2, 33, 8]; numbers[1] = 33 (verified with node) (L8).` },
            { type: `mcq`, q: `Which of the following is a valid way to convert a string to a number in JavaScript?`, o: [`parseInt("42")`, `Number("42")`, `parseFloat("42")`, `All of them`], a: 3, why: `All three convert (L9).` },
            { type: `mcq`, q: `The output of console.log(typeof NaN); is`, o: [`NaN`, `number`, `null`, `undefined`], a: 1, why: `NaN is of type number (L7).` },
            { type: `mcq`, q: `The output of console.log(typeof typeof 1); is`, o: [`String`, `Number`, `!`, `True`], a: 0, why: `typeof 1 = "number", a string, so typeof "number" = "string" (L7).` },
            { type: `mcq`, q: `What is the data type of the result of a mathematical operation between a number and a string in JavaScript?`, o: [`Number`, `String`, `NaN`, `Error`], a: 1, why: `With + the number is converted and concatenated (5 + "9" = "59"), giving a String; this is the expected answer. (With -, * or / the result would be a number, e.g. "6" - 2 = 4.)` }
          ] },
        { title: `Question 1 (b) and Question 2 · Written`, marks: `25 marks`, items: [
            { type: `written`, q: `Q1(b) [5 marks] What are the similarities and differences between JavaScript and PHP?`, ans: `<b>Similarities</b>: both are interpreted, loosely typed scripting languages with C/Java-like syntax (if/else, for, while, functions, arrays), both are embedded in HTML and used to build dynamic web pages, and both convert types automatically.<br><b>Differences</b>: JavaScript is client-side (runs in the browser), PHP is server-side (runs on the web server and sends only its output); JS source is visible to the user, PHP code is not (security); PHP can access databases and the server's files, client-side JS cannot read/write files; JS reacts to events without reloading the page, PHP builds the page per request (forms via $_GET/$_POST); PHP variables start with $ and strings are joined with "." while JS uses var/let/const and "+".` },
            { type: `written`, q: `Q2(a) [8 marks] Define the following terms: 1) SQL Injection 2) Dynamic Website 3) Uniform Resource Locator (URL) 4) HTTP (Hypertext Transfer Protocol).`, ans: `<b>1) SQL injection</b>: an attempt by hackers to manipulate your database by inserting rogue code into your query, which can change tables, get information or delete data.<br><b>2) Dynamic website</b>: a site whose pages are not stored on the server in the form the user sees; the content changes automatically/frequently based on criteria: the page code is constructed dynamically piece by piece, or the content varies by pre-defined rules or user input.<br><b>3) URL</b>: the complete address of a web page with three parts: protocol (http), site/domain name (www.example.com) and the absolute path to the document (/2012/samples/first.html).<br><b>4) HTTP</b>: a network protocol that ensures the exchange of almost all types of resources on the web (files, pages, images, search results); the browser's language to send requests to the server; HTTPS is the secure encrypted version. (L1)` },
            { type: `written`, q: `Q2(b) [4 marks] Write in detail the ways to associate styles with your HTML document.`, ans: `1) <b>Inline</b>: style attribute on one element, <code>&lt;p style="color:red;"&gt;</code>; a unique style for that element only. 2) <b>Internal (embedded)</b>: &lt;style&gt; element in the &lt;head&gt;; rules for that single page, e.g. <code>&lt;style&gt; h1 {color: blue;} &lt;/style&gt;</code>. 3) <b>External</b>: &lt;link rel="stylesheet" href="styles.css"&gt; in the head of each page; one .css file (no HTML inside) styles many pages; can be a full URL or a relative path. (L4)` },
            { type: `written`, q: `Q2(c) [4 marks] List in detail the types of CSS selectors.`, ans: `Element (type) selector: <code>p { }</code> selects all &lt;p&gt;. ID selector: <code>#id1 { }</code> selects the one element with id="id1". Class selector: <code>.c1 { }</code> selects all elements with class="c1" (<code>p.c1</code> only &lt;p&gt; ones). Grouping selector: <code>h1, p { }</code> applies one rule to several selectors. Universal selector: <code>* { }</code> selects all elements. Also descendant selectors (<code>li a</code>) and pseudo-classes (<code>a:hover</code>, <code>a:visited</code>, <code>tr:nth-child(even)</code>). (Lab 4 / L4)` },
            { type: `written`, q: `Q2(d) [4 marks] Write in detail the HTML Core Attributes.`, ans: `The core (global) attributes usable on almost every element: <b>id</b> (unique identifier, used by CSS #id and getElementById), <b>class</b> (one or more class names shared by elements, used by CSS .class), <b>style</b> (inline CSS, e.g. style="color:red;"), <b>title</b> (extra information shown as a tooltip). Related ones from L2: <b>lang</b> (language of the content, e.g. lang="en-US", helps search engines and browsers) and <b>dir</b> (text direction). Element-specific attributes such as href, src, alt, width and height are not core attributes.` }
          ] },
        { title: `Question 3 · Programming`, marks: `20 marks`, items: [
            { type: `written`, q: `(a) [10 marks] Write the HTML and JavaScript code to make the next form: Number1 [ ], Number2 [ ], buttons ADD SUB MUL DIV MOD, Get Result : [ ].`, ans: `<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;body&gt;
&lt;form&gt;
  Number1: &lt;input type="text" id="n1"&gt;&lt;br&gt;
  Number2: &lt;input type="text" id="n2"&gt;&lt;br&gt;
  &lt;input type="button" value="ADD" onclick="calc('+')"&gt;
  &lt;input type="button" value="SUB" onclick="calc('-')"&gt;
  &lt;input type="button" value="MUL" onclick="calc('*')"&gt;
  &lt;input type="button" value="DIV" onclick="calc('/')"&gt;
  &lt;input type="button" value="MOD" onclick="calc('%')"&gt;&lt;br&gt;
  Get Result : &lt;input type="text" id="res" readonly&gt;
&lt;/form&gt;
&lt;script&gt;
function calc(op) {
  let a = parseFloat(document.getElementById("n1").value);
  let b = parseFloat(document.getElementById("n2").value);
  let r;
  if (isNaN(a) || isNaN(b)) { r = "Enter two numbers"; }
  else {
    switch (op) {
      case '+': r = a + b; break;
      case '-': r = a - b; break;
      case '*': r = a * b; break;
      case '/': r = (b == 0) ? "Cannot divide by 0" : a / b; break;
      case '%': r = a % b; break;
    }
  }
  document.getElementById("res").value = r;
}
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>Example: 17 and 5 &rarr; ADD 22, SUB 12, MUL 85, DIV 3.4, MOD 2.` },
            { type: `written`, q: `(b) [5 marks] Write a JavaScript program to display the Fibonacci sequence using recursion. A Fibonacci sequence is written as 0, 1, 1, 2, 3, 5, 8, 13, 21, ...`, ans: `<pre>&lt;script&gt;
function fib(n) {                       // recursive definition
  if (n == 0) return 0;
  if (n == 1) return 1;
  return fib(n - 1) + fib(n - 2);
}
let N = parseInt(prompt("Number of terms:"));
let terms = [];
for (let i = 0; i &lt; N; i++) terms.push(fib(i));
document.write(terms.join(", "));       // N = 9: 0, 1, 1, 2, 3, 5, 8, 13, 21
&lt;/script&gt;</pre>fib(n) = fib(n-1) + fib(n-2) with base cases fib(0) = 0 and fib(1) = 1.` },
            { type: `written`, q: `(c) [5 marks] Write a JavaScript program to print all the prime numbers between 0, 50.`, ans: `<pre>&lt;script&gt;
function isPrime(n) {
  if (n &lt; 2) return false;
  for (let d = 2; d * d &lt;= n; d++)
    if (n % d == 0) return false;
  return true;
}
for (let n = 0; n &lt;= 50; n++)
  if (isPrime(n)) document.write(n + " ");
// Output: 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47
&lt;/script&gt;</pre>A number is prime if it is at least 2 and has no divisor from 2 up to its square root.` }
          ] }
      ] }
  ]
};
