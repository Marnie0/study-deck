window.EXTRA = window.EXTRA || {};
EXTRA.web = {
  1: [
    { q: `Which statement about the Internet and the World Wide Web is correct?`,
      o: [
        [`They are two names for the same thing`, `The lecture stresses that the Internet is NOT the Web.`],
        [`The Web is one service offered by the Internet`, `Correct. The Web is one (the most used) service on the Internet, alongside e-mail, telephony and file sharing.`],
        [`The Internet is one service of the Web`, `Reversed: the Internet is the network, the Web runs on it.`],
        [`The Web is a protocol like TCP/IP`, `The Web is a collection of linked documents; HTTP is its protocol.`]
      ], a: 1 },
    { q: `In "how the Web works", what does the browser do right after it receives the IP address from the DNS?`,
      o: [
        [`Displays the page`, `Display is the last step, after the server responds.`],
        [`Closes the HTTP connection`, `The server closes the connection after sending the page.`],
        [`Sends an HTTP request for the page to the web server`, `Correct. Step 3: with the IP address, the browser requests the page using HTTP.`],
        [`Asks the ISP for the page`, `The ISP only provides access; the request goes to the web server.`]
      ], a: 2 },
    { q: `A link "Back to top" that jumps to the beginning of the same page is a:`,
      o: [
        [`Text hyperlink`, `A text link goes to another page/file; this one stays on the same page.`],
        [`Image hyperlink`, `An image hyperlink uses a picture as the clickable link; this one is text and, more importantly, it jumps within the same page (a bookmark).`],
        [`E-mail hyperlink`, `An e-mail hyperlink lets the visitor send an e-mail to the displayed address; "Back to top" moves to another part of the same page.`],
        [`Bookmark hyperlink`, `Correct. Bookmark links take visitors to another part of the same page.`]
      ], a: 3 },
    { q: `In <code>http://shop.example.com/2024/items/list.html</code>, what is "shop"?`,
      o: [
        [`The host name at the domain example.com`, `Correct. Like "www", "development" or "clients" in the lecture, "shop" is a particular host at that domain.`],
        [`The top-level domain`, `The top-level domain is "com", the last part of the domain name; "shop" is the host name in front of example.com.`],
        [`The protocol`, `The protocol is "http", the part before "://"; "shop" is the particular host at the domain example.com.`],
        [`A directory on the server`, `Directories come after the domain: 2024 and items.`]
      ], a: 0 },
    { q: `A news site that shows each logged-in user headlines chosen from his own interests is best described as:`,
      o: [
        [`A static website`, `Static pages are stored in the same form every user sees.`],
        [`A web hosting service`, `Hosting stores sites; it does not describe page behavior.`],
        [`A dynamic website`, `Correct. The content varies based on criteria (user input/preferences).`],
        [`A wiki site`, `A wiki is a site whose content users edit collaboratively (Wikipedia, WikiHow); personalized headlines make it a dynamic site.`]
      ], a: 2 },
    { q: `"Keep images not larger than 10 KB and avoid nested tables" belongs to which design issue?`,
      o: [
        [`Page layout`, `Page layout is about letting people find relevant content quickly and keeping pages simple, not about image size or nested tables.`],
        [`Download speed`, `Correct. Optimizing graphics, smaller pages and no nested tables improve download speed.`],
        [`Colors`, `The Colors issue is about using standard colors (blue links, violet visited, red active), not about image size or nested tables.`],
        [`Web accessibility`, `Accessibility is about users with disabilities.`]
      ], a: 1 },
    { q: `Which of the following is NOT one of the phishing e-mail symptoms listed in the lecture?`,
      o: [
        [`Spelling and bad grammar`, `Spelling mistakes and bad grammar are listed as a phishing symptom, so this cannot be the one that is NOT listed.`],
        [`Threats such as "your account will be closed"`, `Threats like "your account will be closed" are a listed phishing symptom, used to push the victim into acting quickly.`],
        [`Spoofing popular websites or companies`, `Spoofing popular websites or companies (fake look-alike graphics and links) is a listed phishing symptom.`],
        [`The e-mail arrives during working hours`, `Correct. The listed symptoms are bad spelling and grammar, suspicious links, threats and spoofing popular sites or companies; the time an e-mail arrives is not one of them (L1, Email phishing).`]
      ], a: 3 },
    { q: `According to the security considerations, where should data validation be performed?`,
      o: [
        [`Only on the client side`, `Client-side checks alone can be bypassed by sending data straight to the server; the lecture asks for validation on both sides.`],
        [`Only on the server side`, `The lecture asks for validation on both the server side and the client side, not on the server only.`],
        [`On both the server side and the client side`, `Correct. The security considerations say data must be validated on both the server side and the client side; client checks give fast feedback and server checks cannot be bypassed (L1, Website security).`],
        [`It is not needed if SSL is used`, `SSL encrypts traffic; it does not validate data.`]
      ], a: 2 },
    { q: `Why can two search engines return different results for the same query?`,
      o: [
        [`Each searches its own indexed database, not the whole Internet`, `Correct. Results come from the engine's own collected and indexed database.`],
        [`One of them always has an error`, `Different results are normal, not an error: each engine searches its own collected and indexed database, not the whole Internet.`],
        [`They use different versions of HTTP`, `HTTP only carries the request and response; the results depend on what each engine has collected and indexed in its database.`],
        [`The ISP filters one of them`, `The lecture's reason has nothing to do with the ISP: each engine queries its own indexed database, so their results differ.`]
      ], a: 0 },
    { q: `Which pair correctly matches the protocol to its job?`,
      o: [
        [`FTP: secure encrypted web pages`, `FTP is for uploading and downloading files; the secure, encrypted version of HTTP for web pages is HTTPS.`],
        [`TCP/IP: uploading files only`, `TCP/IP is the general communication protocol.`],
        [`HTTPS: secure, encrypted version of HTTP`, `Correct. HTTP exchanges web resources and is the browser's request language; HTTPS is its secure, encrypted version (L1, Protocols).`],
        [`ISP: rules computers follow to communicate`, `ISP is an organization; those rules are TCP/IP.`]
      ], a: 2 }
  ],
  2: [
    { q: `Which line nests tags correctly?`,
      o: [
        [`&lt;b&gt;&lt;i&gt;Hello&lt;/b&gt;&lt;/i&gt;`, `The nearest (inner) tag must be closed first.`],
        [`&lt;b&gt;&lt;i&gt;Hello&lt;/i&gt;&lt;/b&gt;`, `Correct. With nested tags you close the nearest tag first: &lt;i&gt; was opened last, so &lt;/i&gt; comes before &lt;/b&gt; (L2, Nested tags).`],
        [`&lt;b&gt;&lt;i&gt;Hello&lt;b&gt;&lt;i&gt;`, `Both tags are opened twice and never closed with &lt;/i&gt; and &lt;/b&gt;; the lecture says never to skip end tags.`],
        [`&lt;/b&gt;&lt;i&gt;Hello&lt;b&gt;&lt;/i&gt;`, `This starts with a closing tag &lt;/b&gt; before any &lt;b&gt; was opened; tags must be opened first, then closed inner-first.`]
      ], a: 1 },
    { q: `What does <code>&lt;html lang="ar-EG"&gt;</code> declare?`,
      o: [
        [`English language, Egypt country`, `"ar" is the code for Arabic, not English (en); the first two letters give the language and the last two the country.`],
        [`Arabic language, Egypt country`, `Correct. First two letters = language, last two = country.`],
        [`Egypt language, Arabic country`, `The order is language then country: "ar" is the language (Arabic) and "EG" the country (Egypt), not the reverse.`],
        [`An Arabic font`, `lang declares the page's language to help search engines and browsers; it does not select a font (that is CSS font-family).`]
      ], a: 1 },
    { q: `A page at <code>https://site.com/blog/post.html</code> contains <code>&lt;img src="/images/a.png"&gt;</code>. Which file is loaded?`,
      o: [
        [`https://site.com/blog/images/a.png`, `That would be the case without the leading slash.`],
        [`https://images/a.png`, `A leading slash keeps the same domain (site.com) and starts from its root; it never drops the domain from the address.`],
        [`https://site.com/images/a.png`, `Correct. A leading slash makes the path relative to the domain root.`],
        [`An external site's image`, `/images/a.png has no domain, so it is a relative URL within the same site; an external image would need an absolute URL.`]
      ], a: 2 },
    { q: `Which of these is an empty element (no end tag)?`,
      o: [
        [`&lt;p&gt;`, `&lt;p&gt; has content and an end tag &lt;/p&gt;; the lecture warns not to skip it even though browsers may tolerate it.`],
        [`&lt;title&gt;`, `&lt;title&gt; has content (the page title) and an end tag &lt;/title&gt;, so it is not an empty element.`],
        [`&lt;a&gt;`, `&lt;a&gt; has content (the clickable text or image) and an end tag &lt;/a&gt;, so it is not an empty element.`],
        [`&lt;hr&gt;`, `Correct. Like &lt;br&gt; and &lt;img&gt;, it has no content and no end tag.`]
      ], a: 3 },
    { q: `Where are attributes always written?`,
      o: [
        [`In the start tag`, `Correct. Attributes provide additional information, come as name="value" pairs and are always written in the start tag, e.g. &lt;a href="..."&gt; (L2, Attributes).`],
        [`In the end tag`, `End tags never take attributes; attributes such as href and src are always placed in the start tag.`],
        [`Between the tags as content`, `What is between the tags is the element's content; attributes are written as name="value" inside the start tag.`],
        [`Only in the &lt;head&gt;`, `All HTML elements can have attributes, including body elements like &lt;img&gt; and &lt;a&gt;, not only head elements.`]
      ], a: 0 },
    { q: `Which element belongs in the &lt;body&gt; and NOT in the &lt;head&gt;?`,
      o: [
        [`&lt;title&gt;`, `&lt;title&gt; is metadata and belongs in the head; it is shown in the browser tab, not in the page body.`],
        [`&lt;meta charset="UTF-8"&gt;`, `&lt;meta charset="UTF-8"&gt; is metadata about the page and belongs in the head.`],
        [`&lt;h1&gt;`, `Correct. &lt;h1&gt; is a heading, visible content, so it goes between &lt;body&gt; and &lt;/body&gt;; the head holds only metadata (L2, Document rules).`],
        [`&lt;link rel="stylesheet"&gt;`, `&lt;link rel="stylesheet"&gt; attaches an external CSS file and belongs in the head.`]
      ], a: 2 },
    { q: `What happens when the mouse hovers over <code>&lt;p title="Hi there"&gt;Text&lt;/p&gt;</code>?`,
      o: [
        [`The text changes to "Hi there"`, `The title attribute does not replace the element's content; "Text" stays and "Hi there" appears as a tooltip.`],
        [`A tooltip "Hi there" appears`, `Correct. title gives extra information shown as a tooltip.`],
        [`The browser tab title changes`, `The browser tab title comes from the &lt;title&gt; element in the head, not from the title attribute of a paragraph.`],
        [`Nothing; title is invalid on &lt;p&gt;`, `title is valid on all elements, &lt;p&gt; included; it shows its value as a tooltip on hover.`]
      ], a: 1 },
    { q: `Which statement about <code>&lt;!DOCTYPE html&gt;</code> is FALSE?`,
      o: [
        [`It must appear only once`, `This is a true statement: the DOCTYPE must appear only once. The question asks for the false one.`],
        [`It goes at the very top, before any HTML tags`, `This is a true statement: the DOCTYPE goes at the very top, before any HTML tags. The question asks for the false one.`],
        [`It is not case sensitive`, `This is a true statement: &lt;!DOCTYPE html&gt; is not case sensitive. The question asks for the false one.`],
        [`It is an HTML element that is displayed`, `Correct (this is the false statement). It is a declaration that helps browsers display the page; it is not displayed.`]
      ], a: 3 },
    { q: `Why should the page &lt;title&gt; be chosen carefully?`,
      o: [
        [`It affects the page's ranking in some search engines and appears in favorites, history and bookmarks`, `Correct. The lecture says the title determines the page's ranking in certain search engines and appears in Favorites, History and Bookmark lists (L2, &lt;title&gt;).`],
        [`It sets the page's font`, `The page's font is set with CSS (font-family), not by the &lt;title&gt; element.`],
        [`It is shown as the largest heading on the page`, `The title is shown in the browser tab, not on the page; the largest heading on the page is &lt;h1&gt;.`],
        [`It is required for images to load`, `Images load from their src attribute whether or not a title exists; the title matters for search ranking and bookmarks.`]
      ], a: 0 },
    { q: `An image fails to load because of a typo in src. What does the visitor see if alt="Logo" is set?`,
      o: [
        [`Nothing at all`, `The browser does not leave the space empty: when an image cannot be displayed, it shows the alt text instead.`],
        [`The text "Logo" in place of the image`, `Correct. That is the purpose of the required alt attribute.`],
        [`A tooltip only`, `A tooltip comes from the title attribute; alt text is displayed in place of the missing image.`],
        [`An error message from the server`, `A wrong src is handled by the browser, which shows the alt text "Logo"; no server error page replaces the image.`]
      ], a: 1 }
  ],
  3: [
    { q: `A poem is typed on four lines inside a &lt;p&gt; element. How is it displayed?`,
      o: [
        [`On four lines in a fixed-width font`, `Fixed-width text that keeps line breaks is what &lt;pre&gt; does; inside &lt;p&gt; the line breaks collapse.`],
        [`On one line, extra spaces and line breaks collapsed`, `Correct. Browsers collapse extra spaces and line breaks inside &lt;p&gt;, so the poem appears on one line: the "poem problem", solved with &lt;pre&gt; (L3).`],
        [`It is not displayed`, `The text is displayed, just not as typed: the browser collapses the line breaks into a single line.`],
        [`On four lines in bold`, `&lt;p&gt; does not keep line breaks and does not make text bold; the poem shows on one line in normal text.`]
      ], a: 1 },
    { q: `How does the browser show <code>My favorite color is &lt;del&gt;blue&lt;/del&gt; &lt;ins&gt;red&lt;/ins&gt;</code>?`,
      o: [
        [`"blue" struck through and "red" usually underlined`, `Correct. del = deleted text, ins = inserted text.`],
        [`"blue" bold and "red" italic`, `Bold comes from &lt;b&gt;/&lt;strong&gt; and italic from &lt;i&gt;/&lt;em&gt;; &lt;del&gt; strikes through and &lt;ins&gt; underlines.`],
        [`"blue" highlighted and "red" small`, `Highlighting is &lt;mark&gt; and smaller text is &lt;small&gt;; &lt;del&gt; strikes through and &lt;ins&gt; underlines.`],
        [`Both hidden`, `Neither element hides text: deleted text is shown struck through and inserted text is shown underlined.`]
      ], a: 0 },
    { q: `Which color is a shade of gray?`,
      o: [
        [`rgb(120, 60, 60)`, `The three values are not equal (red is higher), so this is a dark reddish color, not gray.`],
        [`rgb(0, 0, 255)`, `Red 0, green 0, blue 255 is pure blue; gray needs all three values equal.`],
        [`rgb(255, 99, 71)`, `rgb(255, 99, 71) is Tomato from the lecture; its values are unequal, so it is not gray.`],
        [`rgb(120, 120, 120)`, `Correct. Shades of gray use equal values for all three RGB parameters, so rgb(120, 120, 120) is a medium gray (L3, Colors).`]
      ], a: 3 },
    { q: `In <code>hsla(9, 100%, 64%, 0.2)</code>, what does 0.2 control?`,
      o: [
        [`Hue`, `Hue is the first value (9, a reddish hue on the color wheel); 0.2 is the fourth value, alpha.`],
        [`Lightness`, `Lightness is the third value (64%); 0.2 is the fourth value, alpha, which controls opacity.`],
        [`Opacity (alpha): mostly transparent`, `Correct. Alpha ranges from 0 (fully transparent) to 1.`],
        [`Font size`, `Font size is a separate CSS property (font-size), not part of a color value; 0.2 is the alpha channel.`]
      ], a: 2 },
    { q: `Which inline style is written correctly with two properties?`,
      o: [
        [`style="color=red, font-size=20px"`, `CSS inside style uses property:value with a colon and separates declarations with semicolons, not = and commas.`],
        [`style="color:red; font-size:20px;"`, `Correct. property:value pairs separated by semicolons.`],
        [`style={color:red; font-size:20px}`, `Braces are for style sheets, not the attribute.`],
        [`style="red; 20px"`, `The property names are missing; each declaration must be property:value, e.g. color:red; font-size:20px;.`]
      ], a: 1 },
    { q: `Which element should you use to highlight a search term in yellow by default?`,
      o: [
        [`&lt;strong&gt;`, `&lt;strong&gt; marks important text in bold, without a yellow highlight; highlighting is &lt;mark&gt;.`],
        [`&lt;em&gt;`, `&lt;em&gt; marks emphasized text in italic, without a highlight; highlighting is &lt;mark&gt;.`],
        [`&lt;mark&gt;`, `Correct. &lt;mark&gt; defines marked/highlighted text, shown with a yellow background by default (L3, Text formatting).`],
        [`&lt;small&gt;`, `&lt;small&gt; makes text smaller and does not highlight it; highlighting is &lt;mark&gt;.`]
      ], a: 2 },
    { q: `Which pair is semantic (meaningful) rather than only visual?`,
      o: [
        [`&lt;b&gt; and &lt;i&gt;`, `&lt;b&gt; and &lt;i&gt; are purely visual bold and italic; their semantic versions are &lt;strong&gt; and &lt;em&gt;.`],
        [`&lt;u&gt; and &lt;small&gt;`, `&lt;u&gt; (underline) and &lt;small&gt; (smaller text) only change appearance and carry no meaning of importance or emphasis.`],
        [`&lt;sub&gt; and &lt;sup&gt;`, `&lt;sub&gt; and &lt;sup&gt; only position text below or above the line; the semantic pair is &lt;strong&gt; and &lt;em&gt;.`],
        [`&lt;strong&gt; and &lt;em&gt;`, `Correct. &lt;strong&gt; means important text and &lt;em&gt; emphasized text, so they carry meaning, while &lt;b&gt; and &lt;i&gt; are visual only (L3, Text formatting).`]
      ], a: 3 },
    { q: `The text inside &lt;pre&gt; is displayed:`,
      o: [
        [`In a fixed-width font, keeping spaces and line breaks`, `Correct. &lt;pre&gt; defines preformatted text, displayed in a fixed-width font (usually Courier), and preserves both spaces and line breaks (L3).`],
        [`In bold, removing spaces`, `&lt;pre&gt; does the opposite of removing spaces: it keeps every space and line break, and it does not make text bold.`],
        [`Hidden until hovered`, `&lt;pre&gt; text is shown normally on the page; nothing in it is hidden until hover (a tooltip comes from the title attribute).`],
        [`As a horizontal rule`, `A horizontal rule is drawn by &lt;hr&gt;; &lt;pre&gt; shows preformatted text in a fixed-width font.`]
      ], a: 0 },
    { q: `Which one is NOT a text formatting element from the lecture's list?`,
      o: [
        [`&lt;small&gt;`, `&lt;small&gt; (smaller text) is in the lecture's text formatting list, so it cannot be the one that is NOT.`],
        [`&lt;section&gt;`, `Correct. section is a block-level structural element.`],
        [`&lt;sub&gt;`, `&lt;sub&gt; (subscript) is in the lecture's text formatting list, so it cannot be the one that is NOT.`],
        [`&lt;ins&gt;`, `&lt;ins&gt; (inserted text) is in the lecture's text formatting list, so it cannot be the one that is NOT.`]
      ], a: 1 },
    { q: `Which value is the same color as the name "Tomato"?`,
      o: [
        [`#ff6347`, `Correct. = rgb(255, 99, 71) = hsl(9, 100%, 64%).`],
        [`#6347ff`, `#6347ff puts the channels in the wrong order (red 63, green 47, blue ff), giving a bluish purple; Tomato is #ff6347.`],
        [`rgb(99, 255, 71)`, `rgb(99, 255, 71) has green at full value, so it is a bright green; Tomato is rgb(255, 99, 71).`],
        [`hsl(200, 100%, 64%)`, `Hue 200 is in the blue range; Tomato has hue 9: hsl(9, 100%, 64%).`]
      ], a: 0 }
  ],
  4: [
    { q: `A &lt;p&gt; is red in the external file, blue in the internal &lt;style&gt;, and has style="color:green". Which color wins (all with simple selectors)?`,
      o: [
        [`Red`, `External rules have the lowest priority here.`],
        [`Blue`, `The internal &lt;style&gt; rule beats the external file, but an inline style on the element overrides both, so green wins.`],
        [`Green`, `Correct. Inline styles override internal and external rules in the cascade.`],
        [`Black (conflict cancels them)`, `Conflicts are resolved by the cascade, not cancelled.`]
      ], a: 2 },
    { q: `<code>div {padding: 10px 20px;}</code> gives what left padding?`,
      o: [
        [`10px`, `With two values the first is top and bottom, so 10px is the top/bottom padding, not the left.`],
        [`20px`, `Correct. Two values: top/bottom, then right/left.`],
        [`30px`, `The two values are not added together; 10px applies to top/bottom and 20px to right/left.`],
        [`0`, `The left side is not 0: the second of two values covers both right and left, giving 20px.`]
      ], a: 1 },
    { q: `A div has width:100px; padding:10px; border:2px solid; margin:5px (default box sizing). How much horizontal space does it take in total?`,
      o: [
        [`100px`, `100px is only the content width; padding, border and margin are added on both sides in the default box model.`],
        [`124px`, `That is content + padding + border, without margins.`],
        [`134px`, `Correct. Every box layer counts on both sides: 100 + 2×10 (padding) + 2×2 (border) + 2×5 (margin) = 134px (L4, Box model).`],
        [`117px`, `117 = 100 + 10 + 2 + 5 counts padding, border and margin on one side only; each appears on the left and the right.`]
      ], a: 2 },
    { q: `Which rule styles only the element with id="main"?`,
      o: [
        [`.main {color: red;}`, `A dot is the class selector, so .main styles every element with class="main", not the one with id="main".`],
        [`main {color: red;}`, `Without # or ., main is an element selector that targets &lt;main&gt; elements, not id="main".`],
        [`*main {color: red;}`, `*main is not a valid selector; * alone is the universal selector. The id selector is #main.`],
        [`#main {color: red;}`, `Correct. The id selector is written # plus the id, so #main styles the element with id="main" (ids are unique) (L4, Selectors).`]
      ], a: 3 },
    { q: `What must an external style sheet file NOT contain?`,
      o: [
        [`CSS comments`, `CSS comments /* ... */ are allowed in a .css file; what it must not contain is HTML.`],
        [`HTML tags`, `Correct. The .css file must not contain any HTML code.`],
        [`Selectors`, `Selectors are the core of every CSS rule, so an external sheet must contain them; it must not contain HTML tags.`],
        [`Color values`, `Color values such as powderblue or #ff6347 are normal CSS values, so they are allowed in a .css file.`]
      ], a: 1 },
    { q: `<code>h1, p {color: red;}</code> is an example of which selector?`,
      o: [
        [`Grouping selector`, `Correct. A grouping selector lists selectors separated by commas, so h1, p applies one rule to all &lt;h1&gt; and all &lt;p&gt; (L4, Selectors).`],
        [`Descendant selector`, `A descendant selector has a space and no comma, e.g. h1 p (a p inside an h1); the comma means grouping.`],
        [`Class selector`, `A class selector starts with a dot, e.g. .c1; h1, p has no dot, it groups two element selectors.`],
        [`Universal selector`, `The universal selector is * and selects all elements; h1, p selects only &lt;h1&gt; and &lt;p&gt;.`]
      ], a: 0 },
    { q: `<code>&lt;link rel="stylesheet" href="/html/styles.css"&gt;</code> loads the style sheet from:`,
      o: [
        [`The same folder as the page`, `A file in the same folder would be href="styles.css" with no slash; the leading slash starts at the site root.`],
        [`The html folder at the root of the current web site`, `Correct. Leading slash = relative to the site root.`],
        [`An external site called html`, `No domain is given, so this is a relative URL on the same site; an external site would need a full URL like https://...`],
        [`It is invalid`, `It is valid: the lecture uses exactly href="/html/styles.css" for a sheet in the html folder of the current site.`]
      ], a: 1 },
    { q: `Which selector changes a link's background only while the mouse is over it?`,
      o: [
        [`a:visited`, `a:visited styles links the user has already visited, all the time, not only while the mouse is over them.`],
        [`a:active`, `a:active applies while the link is being clicked, not while the mouse simply hovers over it.`],
        [`a:link`, `a:link styles unvisited links in their normal state; the mouse-over state is a:hover.`],
        [`a:hover`, `Correct. The :hover pseudo-class applies only while the mouse is over the element, as in the nav-bar rule li a:hover {background-color:#111;} (L4).`]
      ], a: 3 },
    { q: `Which part of the box model shows the element's background color?`,
      o: [
        [`Content and padding (up to the border)`, `Correct. The margin is transparent outside the border.`],
        [`Margin only`, `Margins are transparent space outside the border, so the background color never shows there.`],
        [`None of it`, `The background color is painted behind the content and padding, so part of the box does show it.`],
        [`Only the border`, `The border has its own color set in border (e.g. 2px solid powderblue); the background fills content and padding.`]
      ], a: 0 },
    { q: `Which CSS declaration removes the bullets from a navigation-bar list?`,
      o: [
        [`list-style-type: square;`, `list-style-type: square changes the bullets to squares rather than removing them; none removes them.`],
        [`text-decoration: none;`, `text-decoration: none removes the underline from links, not the list bullets; that is list-style-type: none.`],
        [`list-style-type: none;`, `Correct. The nav-bar rule ul {list-style-type:none; margin:0; padding:0;} removes the bullets from the list of links (L4, Navigation bar).`],
        [`display: none;`, `display: none hides the whole list, links included; only the bullets should go, with list-style-type: none.`]
      ], a: 2 }
  ],
  5: [
    { q: `A table's first row is <code>&lt;tr&gt;&lt;td colspan="2"&gt;A&lt;/td&gt;&lt;td&gt;B&lt;/td&gt;&lt;td&gt;C&lt;/td&gt;&lt;/tr&gt;</code>. How many columns does the table have?`,
      o: [
        [`3`, `3 counts the cells, not the columns: the colspan="2" cell spans two columns, so 2 + 1 + 1 = 4.`],
        [`4`, `Correct. colspan="2" makes A span two columns, and B and C take one each: 2 + 1 + 1 = 4 columns (L5, colspan and rowspan).`],
        [`2`, `2 ignores B and C; the row covers 2 columns for A plus one each for B and C, which is 4.`],
        [`5`, `5 counts one column too many; A spans 2 and B and C one each, so 2 + 1 + 1 = 4.`]
      ], a: 1 },
    { q: `Row 1 of a 3-column table has a cell with rowspan="2". How many &lt;td&gt; cells should row 2 contain?`,
      o: [
        [`3`, `3 ignores the rowspan: the cell from row 1 extends down into row 2 and already fills one of its columns.`],
        [`1`, `Only one column of row 2 is taken by the rowspan cell, so 3 − 1 = 2 cells are needed, not 1.`],
        [`2`, `Correct. 3 columns minus the one covered by the rowspan.`],
        [`4`, `A 3-column table can never need 4 cells in a row; with one column covered by the rowspan, row 2 needs 2.`]
      ], a: 2 },
    { q: `What is the first marker of <code>&lt;ol type="I" start="4"&gt;</code>?`,
      o: [
        [`4`, `4 is the start value, but type="I" shows it as an uppercase roman number, IV, not as a digit.`],
        [`D`, `D (the 4th letter) would come from type="A"; type="I" shows uppercase roman numbers, so IV.`],
        [`iv`, `iv is lowercase roman, which needs type="i"; uppercase type="I" gives IV.`],
        [`IV`, `Correct. Uppercase roman numbering starting at 4.`]
      ], a: 3 },
    { q: `In a description list, which tag holds the term being described?`,
      o: [
        [`&lt;dt&gt;`, `Correct. &lt;dd&gt; holds its description, &lt;dl&gt; the whole list.`],
        [`&lt;dd&gt;`, `&lt;dd&gt; holds the description of the term ("- black hot drink"), not the term itself, which is &lt;dt&gt;.`],
        [`&lt;dl&gt;`, `&lt;dl&gt; is the container for the whole description list; each term inside it is a &lt;dt&gt;.`],
        [`&lt;li&gt;`, `&lt;li&gt; is the item tag of &lt;ul&gt; and &lt;ol&gt;; a description list uses &lt;dt&gt; for terms and &lt;dd&gt; for descriptions.`]
      ], a: 0 },
    { q: `How are &lt;th&gt; cells displayed by default?`,
      o: [
        [`Italic and right-aligned`, `&lt;th&gt; header cells are not italic or right-aligned by default; they are displayed bold and centered.`],
        [`Bold and centered`, `Correct. &lt;th&gt; defines a header cell, which browsers display bold and centered by default, unlike ordinary &lt;td&gt; cells (L5, Tables).`],
        [`Underlined`, `&lt;th&gt; text is not underlined by default; header cells are displayed bold and centered.`],
        [`Hidden`, `Header cells are visible content, displayed bold and centered; nothing about &lt;th&gt; hides them.`]
      ], a: 1 },
    { q: `Which is the correct nested list?`,
      o: [
        [`&lt;ul&gt;&lt;li&gt;Tea&lt;/li&gt;&lt;ul&gt;&lt;li&gt;Green&lt;/li&gt;&lt;/ul&gt;&lt;/ul&gt;`, `Here the inner &lt;ul&gt; sits directly inside the outer &lt;ul&gt;, after the item; a nested list must go inside the &lt;li&gt; it belongs to.`],
        [`&lt;ul&gt;&lt;ul&gt;Tea&lt;/ul&gt;&lt;/ul&gt;`, `The items have no &lt;li&gt; tags; every item of a &lt;ul&gt; must start with &lt;li&gt;, and nesting goes inside an &lt;li&gt;.`],
        [`&lt;ul&gt;&lt;li&gt;Tea&lt;ul&gt;&lt;li&gt;Green&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;`, `Correct. The inner &lt;ul&gt; is placed inside the "Tea" list item.`],
        [`&lt;li&gt;&lt;ul&gt;Tea&lt;/ul&gt;&lt;/li&gt;`, `There is no outer &lt;ul&gt; around the &lt;li&gt;, and the inner list has no &lt;li&gt;; a list item must belong to a list.`]
      ], a: 2 },
    { q: `Which declaration gives every second row a gray background?`,
      o: [
        [`tr:nth-child(even) {background-color: #f2f2f2;}`, `Correct. tr:nth-child(even) selects every second row, giving striped (zebra) rows, as in the lecture's tr:nth-child(even) {background-color: #f2f2f2;} (L5).`],
        [`tr:even {background-color: #f2f2f2;}`, `:even is not a CSS pseudo-class; even rows are selected with :nth-child(even).`],
        [`tr[2] {background-color: #f2f2f2;}`, `tr[2] is an attribute selector (rows with an attribute named 2), not a row number; use tr:nth-child(even).`],
        [`td + td {background-color: #f2f2f2;}`, `td + td selects every cell that follows another cell in the same row, which colors columns, not alternate rows.`]
      ], a: 0 },
    { q: `Which tag adds a title shown above the table?`,
      o: [
        [`&lt;th&gt;`, `&lt;th&gt; is a header cell inside a row, not a title above the table; that is &lt;caption&gt;.`],
        [`&lt;title&gt;`, `&lt;title&gt; is the page title shown in the browser tab, placed in the head; a table title is &lt;caption&gt;.`],
        [`&lt;thead&gt;`, `&lt;thead&gt; groups the header rows inside the table; a title shown above the table is &lt;caption&gt;.`],
        [`&lt;caption&gt;`, `Correct. &lt;caption&gt; defines a table caption, displayed as a title above the table by default (L5, Tables).`]
      ], a: 3 },
    { q: `To set a specific column to 70% of the table width you add style="width:70%" to:`,
      o: [
        [`The &lt;table&gt; element`, `On &lt;table&gt;, style="width:70%" would make the whole table 70% of the page wide, not one column; a column's width is set on one of its &lt;th&gt; or &lt;td&gt; cells.`],
        [`A &lt;th&gt; or &lt;td&gt; of that column`, `Correct. Column width is set on a cell of that column, e.g. &lt;th style="width:70%"&gt;; the table's width uses &lt;table&gt; and row height uses &lt;tr&gt; (L5, Table sizes).`],
        [`The &lt;tr&gt; element`, `A style on &lt;tr&gt; sizes a row, e.g. style="height:200px"; column width is set on a &lt;th&gt; or &lt;td&gt;.`],
        [`The &lt;caption&gt;`, `&lt;caption&gt; is the table's title; its style does not set column widths, which go on a &lt;th&gt; or &lt;td&gt;.`]
      ], a: 1 },
    { q: `Which list type does <code>&lt;ul style="list-style-type:circle;"&gt;</code> produce?`,
      o: [
        [`Numbered list`, `&lt;ul&gt; is an unordered list, so it never numbers its items; numbers come from &lt;ol&gt;.`],
        [`Square bullets`, `Square bullets come from list-style-type:square; circle gives hollow circle bullets.`],
        [`Hollow circle bullets`, `Correct. list-style-type:circle marks each item with a hollow circle; disc (the default) is a filled bullet (L5, list-style-type).`],
        [`No markers`, `No markers would be list-style-type:none; circle gives hollow circle bullets.`]
      ], a: 2 }
  ],
  6: [
    { q: `Which of the following is an inline element?`,
      o: [
        [`&lt;div&gt;`, `&lt;div&gt; is the typical block-level container: it starts on a new line and takes the full width.`],
        [`&lt;a&gt;`, `Correct. &lt;a&gt; is an inline element: it does not start on a new line and is only as wide as its content (L6, Block vs inline table).`],
        [`&lt;table&gt;`, `&lt;table&gt; is block-level: it starts on a new line and takes the available width.`],
        [`&lt;h2&gt;`, `Headings &lt;h1&gt;–&lt;h6&gt; are block-level: each starts on a new line.`]
      ], a: 1 },
    { q: `You set <code>width:300px</code> on a &lt;span&gt; (default display). What happens?`,
      o: [
        [`The span becomes 300px wide`, `A &lt;span&gt; is inline by default, and inline elements do not accept width or height, so it does not become 300px wide.`],
        [`The span starts on a new line`, `Setting width does not change the display value; the span is still inline, so it stays on the same line.`],
        [`An error is shown`, `Browsers do not show errors for CSS; a declaration that does not apply, like width on an inline element, is just ignored.`],
        [`The width is ignored; the span stays as wide as its content`, `Correct (L6 table: width/height not allowed for inline).`]
      ], a: 3 },
    { q: `Which three references all display the euro sign?`,
      o: [
        [`&amp;euro; &amp;#8364; &amp;#x20AC;`, `Correct: entity name, decimal and hexadecimal.`],
        [`&amp;eur; &amp;#8364; &amp;#20AC;`, `&amp;eur; is not the entity name (it is &amp;euro;), and a hexadecimal reference needs an x: &amp;#x20AC;.`],
        [`&amp;euro; &amp;#20AC; &amp;#x8364;`, `Decimal and hex are swapped: the decimal number is 8364 (&amp;#8364;) and the hex is 20AC (&amp;#x20AC;).`],
        [`&amp;EUR; &amp;#128512; &amp;#x20AC;`, `&amp;EUR; is not a valid name (entity names are case sensitive: &amp;euro;), and &amp;#128512; is the &#128512; emoji, not the euro sign.`]
      ], a: 0 },
    { q: `Which line is valid XHTML?`,
      o: [
        [`&lt;IMG SRC="a.png" ALT="a"&gt;`, `XHTML requires lowercase element and attribute names and closes empty elements, so it must be &lt;img src="a.png" alt="a" /&gt;.`],
        [`&lt;img src=a.png alt=a&gt;`, `Values must be quoted and the element closed.`],
        [`&lt;img src="a.png" alt="a" /&gt;`, `Correct. Lowercase, quoted, empty element closed.`],
        [`&lt;img src="a.png" alt="a"&gt;&lt;/IMG&gt;`, `&lt;img&gt; is an empty element closed with /&gt;, and the uppercase end tag &lt;/IMG&gt; breaks the lowercase rule.`]
      ], a: 2 },
    { q: `Three radio buttons let the user pick exactly one size. What must they share?`,
      o: [
        [`The same id`, `ids must be unique in a page, so three inputs cannot share one id; radios are grouped by sharing a name.`],
        [`The same value`, `Each value should differ to tell choices apart.`],
        [`The same name attribute`, `Correct. Radios with the same name form one group.`],
        [`The same label text`, `Each label describes its own choice (Small, Medium, Large), so the texts differ; grouping comes from the shared name.`]
      ], a: 2 },
    { q: `How is a &lt;label&gt; bound to its &lt;input&gt;?`,
      o: [
        [`label for = input id`, `Correct. Clicking the label then toggles/focuses the input.`],
        [`label name = input name`, `&lt;label&gt; has no name attribute to bind with; it is linked through its for attribute matching the input's id.`],
        [`label id = input for`, `This is reversed: the for attribute is on the label and the id is on the input (label for = input id).`],
        [`By writing them on the same line`, `Placing them on the same line does not connect them; the binding is label for = input id.`]
      ], a: 0 },
    { q: `Which method should a login form use, and why?`,
      o: [
        [`GET, because it is faster`, `GET puts the form data, password included, in the URL, where it is visible and stored in history; logins should use POST.`],
        [`POST, because the data is sent in the request body, not shown in the URL`, `Correct. With method="post" the data travels in the HTTP request body and is not shown in the URL, so a password is not exposed (L6, Forms; L10, GET vs POST).`],
        [`GET, because it can be bookmarked`, `A GET URL keeps the data, so a bookmark would store the password in plain text; login data should be sent with POST.`],
        [`No method is needed`, `Without method the form still sends data, using GET by default, which puts the password in the URL.`]
      ], a: 1 },
    { q: `When is the text between &lt;video&gt; and &lt;/video&gt; displayed?`,
      o: [
        [`Always, as a caption`, `The text is not a caption; captions and subtitles are added with &lt;track&gt;. The inner text is a fallback message.`],
        [`When the video ends`, `Nothing appears when the video ends; the inner text is a fallback shown only by browsers without &lt;video&gt; support.`],
        [`While the video loads`, `The text is not a loading message; it is shown only in browsers that do not support the &lt;video&gt; element.`],
        [`Only in browsers that do not support the &lt;video&gt; element`, `Correct. Text between &lt;video&gt; and &lt;/video&gt; is displayed only in browsers that do not support the video element (L6, Multimedia).`]
      ], a: 3 },
    { q: `Which attributes make a video start by itself in modern browsers?`,
      o: [
        [`controls`, `controls only adds play, pause and volume buttons; the user still has to press play.`],
        [`autoplay muted`, `Correct. Add muted after autoplay to let the video start automatically.`],
        [`start="0"`, `start="0" is not an attribute of &lt;video&gt;; a video starts by itself with autoplay plus muted.`],
        [`loop`, `loop makes the video repeat after it ends, but it does not start it; that needs autoplay (with muted).`]
      ], a: 1 },
    { q: `How do you remove the default border of an iframe?`,
      o: [
        [`style="border:none;"`, `Correct. An iframe has a border by default; the lecture removes it with the CSS style="border:none;" (or changes it, e.g. 2px solid red) (L6, Iframes).`],
        [`border="hidden"`, `border="hidden" is not how the lecture does it; the border of an iframe is removed with CSS: style="border:none;".`],
        [`frame="0"`, `frame="0" is not a valid iframe attribute; the border is removed with style="border:none;".`],
        [`style="outline:none;"`, `outline is a separate line drawn outside the border, so removing it leaves the border; use style="border:none;".`]
      ], a: 0 }
  ],
  7: [
    { q: `What is printed?<pre>var a = 1;
{ var a = 2; }
console.log(a);</pre>`,
      o: [
        [`1`, `var is not block scoped, so the inner declaration is the same variable.`],
        [`2`, `Correct. var ignores the block; a becomes 2 (verified with node).`],
        [`undefined`, `a was initialized to 1 and then set to 2, so it is never undefined; var ignores the block, so it prints 2.`],
        [`Error`, `Redeclaring a variable with var is allowed (unlike let), so there is no error; the inner var a is the same variable.`]
      ], a: 1 },
    { q: `What is <code>typeof q</code> after <code>let q;</code>?`,
      o: [
        [`"null"`, `typeof never returns "null" (even typeof null is "object"); a declared, uninitialized variable is "undefined".`],
        [`"object"`, `"object" is what typeof null returns; q was never assigned, so its value is undefined and typeof gives "undefined".`],
        [`"undefined"`, `Correct. Declared but not initialized = undefined.`],
        [`Error`, `q is declared with let, so reading it after the declaration is legal; it just holds undefined.`]
      ], a: 2 },
    { q: `What do <code>"3" + 4 + 5</code> and <code>3 + 4 + "5"</code> give?`,
      o: [
        [`"345" and "75"`, `Correct. Left to right: a string first makes everything concatenate; 3 + 4 = 7 is added before meeting "5" (verified with node).`],
        [`12 and 12`, `12 would need numeric addition throughout, but + with a string operand concatenates, so the results are strings.`],
        [`"345" and "345"`, `In the second, 3 + 4 is computed as numbers first.`],
        [`"39" and "75"`, `4 + 5 is not computed first in the first expression.`]
      ], a: 0 },
    { q: `Which is a real limitation of client-side JavaScript according to the lecture?`,
      o: [
        [`It cannot change HTML content`, `JavaScript can change HTML content, e.g. with innerHTML; that is one of its main uses, not a limitation.`],
        [`It cannot react to mouse events`, `Reacting to the mouse and keyboard is an advantage the lecture lists (increased interactivity), not a limitation.`],
        [`It must be compiled before running`, `JavaScript does not need compiling; it is interpreted by the browser's JS interpreter.`],
        [`It cannot read or write files`, `Correct. Client-side JavaScript does not allow reading or writing files, for security reasons; it also lacks networking and multithreading support (L7, Limitations).`]
      ], a: 3 },
    { q: `Where should you put functions that run many times (e.g. event handlers) according to L7?`,
      o: [
        [`In the &lt;head&gt; section`, `Correct. They are interpreted when the function/handler is called.`],
        [`At the end of the CSS file`, `A CSS file can contain only CSS rules, not JavaScript; functions go in a &lt;script&gt; in the head.`],
        [`Inside the &lt;title&gt;`, `&lt;title&gt; holds only the plain-text page title; scripts go in a &lt;script&gt; element.`],
        [`Only in an &lt;iframe&gt;`, `An &lt;iframe&gt; embeds another document; L7 says functions that run many times go in the &lt;head&gt;.`]
      ], a: 0 },
    { q: `Which output method is mainly used for debugging and is not visible on the page?`,
      o: [
        [`innerHTML`, `innerHTML writes into an HTML element, so the output is visible on the page.`],
        [`document.write()`, `document.write() writes into the HTML output, so the result appears on the page.`],
        [`console.log()`, `Correct. Visible in the browser console (Inspect).`],
        [`window.alert()`, `window.alert() shows a visible alert box to the user, so it is not hidden like console output.`]
      ], a: 2 },
    { q: `What happens?<pre>const c = 1;
c = 2;</pre>`,
      o: [
        [`c becomes 2`, `const declares a constant that cannot be reassigned, so c never becomes 2; the assignment throws.`],
        [`c stays 1 silently`, `The failure is not silent: assigning to a const throws a TypeError when the line runs.`],
        [`A SyntaxError at load time`, `The code parses fine, so there is no SyntaxError at load; the error is a TypeError when c = 2 runs.`],
        [`A TypeError: assignment to constant variable`, `Correct. const declares a constant that cannot be reassigned, so c = 2 throws TypeError: Assignment to constant variable when it runs (L7, Variables; checked with node).`]
      ], a: 3 },
    { q: `Which attribute loads JavaScript from a separate file?`,
      o: [
        [`&lt;script href="app.js"&gt;`, `&lt;script&gt; has no href attribute (href is for links and &lt;link&gt;); an external .js file is loaded with src.`],
        [`&lt;script src="app.js"&gt;&lt;/script&gt;`, `Correct. An external .js file is included with the src attribute of &lt;script&gt;: &lt;script src="file.js"&gt;&lt;/script&gt; (L7, Embedding JS).`],
        [`&lt;link rel="script" href="app.js"&gt;`, `&lt;link rel="stylesheet"&gt; attaches CSS files; JavaScript files are loaded with &lt;script src="..."&gt;.`],
        [`&lt;js file="app.js"&gt;`, `There is no &lt;js&gt; element in HTML; scripts are loaded with &lt;script src="..."&gt;.`]
      ], a: 1 },
    { q: `Which variable name is valid in JavaScript?`,
      o: [
        [`$total`, `Correct. Names may start with $, _ or a letter.`],
        [`2total`, `A variable name cannot start with a digit; it must start with a letter, $ or _.`],
        [`total-price`, `The hyphen is the minus operator, so total-price would be read as total minus price; names may use only letters, digits, $ and _.`],
        [`let`, `let is a reserved word used to declare variables, so it cannot be a variable name.`]
      ], a: 0 },
    { q: `"JavaScript = ECMAScript + ____"`,
      o: [
        [`CSS`, `CSS is the presentation layer, a separate technology; JavaScript = ECMAScript + DOM API.`],
        [`PHP`, `PHP is a separate server-side language; JavaScript is ECMAScript plus the DOM API for working with HTML.`],
        [`DOM API`, `Correct. Language specification plus communication with HTML.`],
        [`HTTP`, `HTTP is the protocol that carries pages; JavaScript is ECMAScript (the language) plus the DOM API.`]
      ], a: 2 }
  ],
  8: [
    { q: `What is y?<pre>let x = 5;
let y = x++ + ++x;</pre>`,
      o: [
        [`11`, `The second operand sees x already incremented twice.`],
        [`12`, `Correct. x++ gives 5 (x becomes 6), ++x makes 7: 5 + 7 = 12 (verified with node).`],
        [`10`, `10 = 5 + 5 ignores both increments; ++x increments before use, and x was already 6 after x++, so it gives 7.`],
        [`13`, `13 = 6 + 7 wrongly uses 6 for x++; post-increment returns the old value 5, so y = 5 + 7 = 12.`]
      ], a: 1 },
    { q: `What do <code>"10" == 10</code> and <code>"10" === 10</code> give?`,
      o: [
        [`true, true`, `=== is strict: it compares type too, and a string is not a number, so "10" === 10 is false.`],
        [`false, false`, `== converts the string "10" to the number 10 before comparing, so "10" == 10 is true.`],
        [`false, true`, `This is reversed: loose == is true after type conversion and strict === is false because the types differ.`],
        [`true, false`, `Correct. == converts types before comparing, so "10" == 10 is true; === requires the same value and type, so "10" === 10 is false (L8, Comparison operators).`]
      ], a: 3 },
    { q: `What is s?<pre>let s = 0;
for (let i = 1; i &lt;= 5; i += 2) s += i;</pre>`,
      o: [
        [`9`, `Correct. i starts at 1 and grows by 2 while i &lt;= 5, so i = 1, 3, 5 and s = 1 + 3 + 5 = 9 (L8, for loop).`],
        [`15`, `15 = 1 + 2 + 3 + 4 + 5 would need i++; with i += 2 only 1, 3 and 5 are added, giving 9.`],
        [`6`, `6 is not produced by the loop: it adds i = 1, 3 and 5 (5 is included since i &lt;= 5), giving 9.`],
        [`4`, `4 = 1 + 3 stops before 5, but the condition i &lt;= 5 includes 5, so s = 9.`]
      ], a: 0 },
    { q: `What is i after the loop?<pre>let i = 10;
do { i++; } while (i &lt; 5);</pre>`,
      o: [
        [`10`, `do...while runs its body once before testing, so i++ executes and i becomes 11 even though 10 &lt; 5 is false.`],
        [`5`, `i only goes up from 10, so it can never reach 5; the body runs once (i = 11), then 11 &lt; 5 ends the loop.`],
        [`11`, `Correct. The body runs once, then 11 &lt; 5 is false.`],
        [`Infinite loop`, `The condition 11 &lt; 5 is false after the first pass, so the loop stops at once; it is not infinite.`]
      ], a: 2 },
    { q: `What does <code>[1, 2, 3, 4].splice(1, 2)</code> return?`,
      o: [
        [`[1, 4]`, `[1, 4] is what remains in the array; splice returns the removed elements instead.`],
        [`[2, 3]`, `Correct. splice returns the removed elements.`],
        [`[2]`, `The second argument is a count: splice(1, 2) removes two elements from index 1 (2 and 3), not one.`],
        [`2`, `2 is the delete count argument; splice returns an array of the removed elements, [2, 3].`]
      ], a: 1 },
    { q: `What does <code>[1, 2].push(5, 6)</code> return?`,
      o: [
        [`[1, 2, 5, 6]`, `That is the new array, but push returns the length.`],
        [`6`, `6 is the last value pushed, but push returns the new length of the array, which is 4.`],
        [`undefined`, `push does return a value: the new length of the array (here 4).`],
        [`4`, `Correct. push adds elements to the end and returns the new length: [1, 2] becomes [1, 2, 5, 6], so it returns 4 (L8, Array methods).`]
      ], a: 3 },
    { q: `What is out?<pre>let g = 'B', out = '';
switch (g) {
  case 'A': out += 'a';
  case 'B': out += 'b';
  case 'C': out += 'c'; break;
  default:  out += 'd';
}</pre>`,
      o: [
        [`"b"`, `Without break after case 'B', execution falls through to 'C'.`],
        [`"bcd"`, `The break after case 'C' stops execution there, so default is never reached and no 'd' is added.`],
        [`"bc"`, `Correct. g === 'B' matches case 'B', which adds 'b'; with no break it falls through to case 'C' (adds 'c'), where break stops it: "bc" (L8, switch).`],
        [`"abc"`, `Matching starts at the case that equals g ('B'); case 'A' does not match and is skipped, so no 'a' is added.`]
      ], a: 2 },
    { q: `What does <code>[10, 1, 3].sort()</code> give?`,
      o: [
        [`[1, 3, 10]`, `Numeric order needs a compare function, e.g. sort((a, b) =&gt; a - b); default sort compares as strings.`],
        [`[1, 10, 3]`, `Correct. Default sort compares strings: "1" &lt; "10" &lt; "3".`],
        [`[10, 3, 1]`, `Default sort is ascending in string order, not descending; as strings "1" &lt; "10" &lt; "3".`],
        [`[3, 1, 10]`, `Neither numeric nor string order gives [3, 1, 10]; string order is "1" &lt; "10" &lt; "3", so [1, 10, 3].`]
      ], a: 1 },
    { q: `What is <code>[5, 6, 7].indexOf(9)</code>?`,
      o: [
        [`-1`, `Correct. indexOf returns the position of the first match, or -1 when the value is not in the array; 9 is not there (L8, Array methods).`],
        [`0`, `0 is the index of 5, the first element; 9 is not in the array at all, so indexOf returns -1.`],
        [`undefined`, `indexOf always returns a number, never undefined; for a missing value it returns -1.`],
        [`3`, `3 is the length of the array, not a search result; a missing value gives -1.`]
      ], a: 0 },
    { q: `What does <code>new Array(3)</code> create?`,
      o: [
        [`An array containing the number 3`, `A single numeric argument sets the size, so no element 3 is stored; an array holding 3 is written [3] (or new Array(1, 3) for several elements).`],
        [`An error`, `new Array(3) is valid; a single numeric argument to the Array constructor is taken as the size.`],
        [`An empty array of length 3`, `Correct (L8: constructor with a single numeric argument = size).`],
        [`[0, 1, 2]`, `The constructor does not fill in index numbers; new Array(3) creates 3 empty slots.`]
      ], a: 2 }
  ],
  9: [
    { q: `What is <code>"JavaScript".charAt(4)</code>?`,
      o: [
        [`"a"`, `"a" is at index 1 and index 3; counting from 0, index 4 is "S" (J=0, a=1, v=2, a=3, S=4).`],
        [`"S"`, `Correct. Indexes start at 0: J=0, a=1, v=2, a=3, S=4, so charAt(4) returns the one-letter string "S" (L9, Strings).`],
        [`"c"`, `"c" is at index 5; charAt(4) returns the character just before it, "S".`],
        [`83`, `83 is the character code of "S", which charCodeAt(4) would return; charAt returns the letter itself.`]
      ], a: 1 },
    { q: `What is <code>"a,b,c".split(",").length</code>?`,
      o: [
        [`5`, `5 counts every character, but split removes the commas and returns only the parts: ["a", "b", "c"].`],
        [`1`, `1 would mean no split happened, but the string contains commas, so it breaks into three parts.`],
        [`2`, `2 counts the commas; two separators divide the string into three parts, so the length is 3.`],
        [`3`, `Correct. split(",") breaks the string at each comma into an array ["a", "b", "c"], whose length is 3 (L9, Strings).`]
      ], a: 3 },
    { q: `What are <code>Math.ceil(-2.5)</code> and <code>Math.floor(-2.5)</code>?`,
      o: [
        [`-2 and -3`, `Correct. ceil goes up (toward +infinity), floor goes down (verified with node).`],
        [`-3 and -2`, `This is reversed: ceil rounds up toward +infinity (−2.5 → −2) and floor rounds down (−2.5 → −3).`],
        [`-2 and -2`, `ceil(−2.5) is −2, but floor rounds down to the largest integer not greater than −2.5, which is −3.`],
        [`2 and 3`, `ceil and floor never change the sign; for −2.5 they give −2 and −3.`]
      ], a: 0 },
    { q: `What is <code>typeof JSON.stringify({a: 1})</code>?`,
      o: [
        [`"object"`, `"object" is typeof the original {a: 1}; JSON.stringify turns it into a string, so typeof gives "string".`],
        [`"json"`, `typeof never returns "json"; JSON text is an ordinary string, so the result is "string".`],
        [`"string"`, `Correct. JSON.parse converts it back to an object.`],
        [`"number"`, `JSON.stringify returns text, not a number, so typeof gives "string".`]
      ], a: 2 },
    { q: `<code>const add = (a, b = 2) =&gt; a + b;</code> What are add(3) and add(3, 4)?`,
      o: [
        [`NaN and 7`, `b has a default value, so it is not undefined.`],
        [`5 and 7`, `Correct. Default parameter b = 2 is used only when b is missing.`],
        [`3 and 7`, `3 would mean b defaulted to 0, but the default is b = 2, so add(3) = 3 + 2 = 5.`],
        [`5 and 5`, `A passed argument replaces the default, so add(3, 4) uses b = 4 and gives 7, not 5.`]
      ], a: 1 },
    { q: `When does a self-invoked function run?`,
      o: [
        [`Only when called by name`, `A self-invoked function is usually anonymous and is not called by name; it runs immediately where it is written.`],
        [`On the onload event`, `It is not tied to any event; the trailing () calls it immediately as the script runs.`],
        [`Never`, `It does run, exactly once, immediately; the lecture's example prints sum=13 right away.`],
        [`Immediately where it is defined: (function(){ ... })();`, `Correct. A self-invoked function is wrapped in parentheses and followed by (), so it runs immediately where it is defined, e.g. (function(){ ... })(); prints sum=13 (L9, Functions).`]
      ], a: 3 },
    { q: `A user saves a color with localStorage, closes the browser and opens the site the next day. What happens?`,
      o: [
        [`The color is still saved`, `Correct. localStorage has no expiration date.`],
        [`The color is lost`, `Losing the data when the browser closes describes sessionStorage; localStorage has no expiration date.`],
        [`The color moves to the server`, `localStorage is kept in the browser on the user's own computer and is never sent to the server; the page reads it back with localStorage.getItem().`],
        [`An error occurs`, `Nothing fails: localStorage data survives closing the browser, so getItem('color') simply returns the saved color.`]
      ], a: 0 },
    { q: `Which event fits "show what the user types in a paragraph, letter by letter"?`,
      o: [
        [`onload`, `onload fires only once, when the page finishes loading, so it cannot follow each key the user types.`],
        [`onkeyup`, `Correct. Fires each time a key is released (L9 example).`],
        [`onresize`, `onresize fires when the window is resized, not when the user types.`],
        [`ondblclick`, `ondblclick fires on a mouse double-click, not when the user types.`]
      ], a: 1 },
    { q: `What is printed?<pre>let o = {a: 1, b: 2};
delete o.a;
console.log(Object.keys(o).length);</pre>`,
      o: [
        [`2`, `delete o.a really removes property a, so only b is left and the key count is 1.`],
        [`0`, `Only a was deleted; b is still in the object, so Object.keys(o) is ["b"] with length 1.`],
        [`1`, `Correct. delete o.a removes property a, so only b is left; Object.keys(o) is ["b"] and its length is 1 (L9, Objects).`],
        [`undefined`, `Object.keys returns an array, and an array's length is always a number, here 1.`]
      ], a: 2 },
    { q: `Which built-in function executes a string as JavaScript code?`,
      o: [
        [`escape`, `escape encodes non-alphanumeric characters as %xx (a space becomes %20); it does not run code.`],
        [`isFinite`, `isFinite only tests whether a value is a finite number; it does not run code.`],
        [`parseInt`, `parseInt converts a string to an integer; it does not execute the string as code.`],
        [`eval`, `Correct. Returns the value of the last statement, e.g. eval("2*3") = 6.`]
      ], a: 3 }
  ],
  10: [
    { q: `What does this print?<pre>$x = "5";
$y = $x + 3;
echo $y;</pre>`,
      o: [
        [`8`, `Correct. The string "5" is converted to a number on +.`],
        [`53`, `53 would be concatenation, which PHP writes with the period (.); with + the string "5" becomes the number 5.`],
        [`"5"3`, `No quotes are printed and nothing is concatenated: + converts "5" to a number and adds 3, giving 8.`],
        [`Error`, `PHP converts the numeric string "5" automatically on +, so there is no error.`]
      ], a: 0 },
    { q: `What does this print?<pre>$a = 10;
$a .= 5;
echo $a;</pre>`,
      o: [
        [`15`, `.= is the concatenation assignment, so it joins "10" and "5" instead of adding them.`],
        [`105`, `Correct. .= appends to the string: $a = $a . 5, so "10" . "5" = "105" (L10, Assignment operators).`],
        [`50`, `50 would be 10 × 5, but .= concatenates, giving "105".`],
        [`Error`, `.= is a valid PHP assignment operator; it converts 10 and 5 to strings and joins them.`]
      ], a: 1 },
    { q: `With <code>$n = 5;</code>, what does <code>echo "Value: {$n}0";</code> print?`,
      o: [
        [`Value: $n0`, `Double-quoted strings replace variables with their values, so {$n} becomes 5, not the text $n.`],
        [`Value: 5`, `The 0 after the closing brace is ordinary text and is printed too, giving "Value: 50".`],
        [`Value: 50`, `Correct. Braces separate the variable name from the following "0".`],
        [`Value: {5}0`, `The braces only mark where the variable name ends; they are not printed, so the output is "Value: 50".`]
      ], a: 2 },
    { q: `What does <code>echo 'Line\\n';</code> print?`,
      o: [
        [`Line followed by a new line`, `\\n becomes a new line only in double quotes; single-quoted strings are not interpreted.`],
        [`Line`, `The backslash and n are not dropped; in single quotes they are printed literally as \\n.`],
        [`Nothing`, `echo prints the text; single quotes only stop interpretation, so "Line\\n" appears as written.`],
        [`Line\\n (literally)`, `Correct. Single-quoted strings are not interpreted.`]
      ], a: 3 },
    { q: `What does <code>isset($never_assigned)</code> return?`,
      o: [
        [`false`, `Correct. An undefined variable is NULL, so isset is false.`],
        [`true`, `isset() returns true only for a variable that is set and not NULL; a never-assigned variable is NULL.`],
        [`NULL`, `isset() always returns a boolean, never NULL; for an unassigned variable it returns false.`],
        [`An error`, `isset() is made to test variables safely, so it does not raise an error for an undefined one; it returns false.`]
      ], a: 0 },
    { q: `What do <code>echo true;</code> and <code>echo false;</code> print?`,
      o: [
        [`true and false`, `PHP does not print the words true and false; TRUE prints as 1 and FALSE as an empty string.`],
        [`1 and 0`, `TRUE prints as 1, but FALSE prints as an empty string, not as 0.`],
        [`1 and nothing (empty string)`, `Correct. When echoed, TRUE is converted to the string "1" and FALSE to an empty string, so nothing appears for false (L10, Booleans).`],
        [`TRUE and FALSE`, `Echo does not print the constant names; TRUE prints as 1 and FALSE prints nothing.`]
      ], a: 2 },
    { q: `What does <code>echo strtoupper(substr("webprog", 3, 4));</code> print?`,
      o: [
        [`PROG`, `Correct. substr from index 3, 4 characters = "prog", then uppercase.`],
        [`BPRO`, `BPRO starts at index 2; indexes are w=0, e=1, b=2, p=3, so substr from 3 gives "prog".`],
        [`PRO`, `The third argument is a length of 4 characters, so "prog" is taken, not just "pro".`],
        [`WEBP`, `WEBP would be substr(0, 4), from the start; this call starts at index 3.`]
      ], a: 0 },
    { q: `What does this print?<pre>$arr = [3, 1, 2];
sort($arr);
echo implode(",", $arr);</pre>`,
      o: [
        [`3,1,2`, `sort() sorts the array in place, so $arr is [1, 2, 3] by the time it is imploded.`],
        [`3,2,1`, `sort() sorts in ascending order; descending would need rsort().`],
        [`Array`, `"Array" is what echo $arr would print; implode joins the elements into the string "1,2,3".`],
        [`1,2,3`, `Correct. sort() sorts the array in ascending order in place, so it becomes [1, 2, 3], and implode(",", ...) joins it into "1,2,3" (L10, Arrays).`]
      ], a: 3 },
    { q: `Which is NOT a characteristic of server-side programming listed in L10?`,
      o: [
        [`Access databases and return results to the browser`, `Accessing data or databases and returning the results to the browser IS listed as a server-side characteristic.`],
        [`Respond to data submitted from HTML forms`, `Responding to user queries and data submitted from HTML forms IS listed as a server-side characteristic.`],
        [`Animate elements in the browser without contacting the server`, `Correct. Animating elements in the browser without the server is client-side work (JavaScript/CSS); L10's list is about editing content, answering forms, accessing databases, customizing pages and security.`],
        [`Provide security because the code cannot be viewed from the browser`, `Providing security because server code cannot be viewed from a browser IS listed as a server-side characteristic.`]
      ], a: 2 },
    { q: `After <code>define("RATE", 5);</code>, which line prints 5?`,
      o: [
        [`echo $RATE;`, `Constants are used without $; $RATE is an undefined variable, so it prints nothing.`],
        [`echo RATE;`, `Correct. A constant made with define("RATE", 5) is used by its bare name without $, so echo RATE; prints 5 (L10, Constants).`],
        [`echo "RATE";`, `Quotes make "RATE" a plain string, so echo prints the text RATE, not the constant's value.`],
        [`echo define(RATE);`, `define creates constants; it does not read them.`]
      ], a: 1 }
  ]
};
