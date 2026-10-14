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
        [`Image hyperlink`, `It uses text, not an image.`],
        [`E-mail hyperlink`, `It does not open an e-mail.`],
        [`Bookmark hyperlink`, `Correct. Bookmark links take visitors to another part of the same page.`]
      ], a: 3 },
    { q: `In <code>http://shop.example.com/2024/items/list.html</code>, what is "shop"?`,
      o: [
        [`The host name at the domain example.com`, `Correct. Like "www", "development" or "clients" in the lecture, "shop" is a particular host at that domain.`],
        [`The top-level domain`, `The top-level domain is "com".`],
        [`The protocol`, `The protocol is http.`],
        [`A directory on the server`, `Directories come after the domain: 2024 and items.`]
      ], a: 0 },
    { q: `A news site that shows each logged-in user headlines chosen from his own interests is best described as:`,
      o: [
        [`A static website`, `Static pages are stored in the same form every user sees.`],
        [`A web hosting service`, `Hosting stores sites; it does not describe page behavior.`],
        [`A dynamic website`, `Correct. The content varies based on criteria (user input/preferences).`],
        [`A wiki site`, `Wikis are edited collaboratively by users.`]
      ], a: 2 },
    { q: `"Keep images not larger than 10 KB and avoid nested tables" belongs to which design issue?`,
      o: [
        [`Page layout`, `Layout is about finding content quickly.`],
        [`Download speed`, `Correct. Optimizing graphics, smaller pages and no nested tables improve download speed.`],
        [`Colors`, `Colors are about standard link colors.`],
        [`Web accessibility`, `Accessibility is about users with disabilities.`]
      ], a: 1 },
    { q: `Which of the following is NOT one of the phishing e-mail symptoms listed in the lecture?`,
      o: [
        [`Spelling and bad grammar`, `This is listed.`],
        [`Threats such as "your account will be closed"`, `This is listed.`],
        [`Spoofing popular websites or companies`, `This is listed.`],
        [`The e-mail arrives during working hours`, `Correct. Timing is not a listed symptom.`]
      ], a: 3 },
    { q: `According to the security considerations, where should data validation be performed?`,
      o: [
        [`Only on the client side`, `Client-side checks can be bypassed.`],
        [`Only on the server side`, `The lecture asks for both.`],
        [`On both the server side and the client side`, `Correct.`],
        [`It is not needed if SSL is used`, `SSL encrypts traffic; it does not validate data.`]
      ], a: 2 },
    { q: `Why can two search engines return different results for the same query?`,
      o: [
        [`Each searches its own indexed database, not the whole Internet`, `Correct. Results come from the engine's own collected and indexed database.`],
        [`One of them always has an error`, `Not the reason given.`],
        [`They use different versions of HTTP`, `The protocol does not decide results.`],
        [`The ISP filters one of them`, `Not the reason given.`]
      ], a: 0 },
    { q: `Which pair correctly matches the protocol to its job?`,
      o: [
        [`FTP: secure encrypted web pages`, `That is HTTPS.`],
        [`TCP/IP: uploading files only`, `TCP/IP is the general communication protocol.`],
        [`HTTPS: secure, encrypted version of HTTP`, `Correct.`],
        [`ISP: rules computers follow to communicate`, `ISP is an organization; those rules are TCP/IP.`]
      ], a: 2 }
  ],
  2: [
    { q: `Which line nests tags correctly?`,
      o: [
        [`&lt;b&gt;&lt;i&gt;Hello&lt;/b&gt;&lt;/i&gt;`, `The nearest (inner) tag must be closed first.`],
        [`&lt;b&gt;&lt;i&gt;Hello&lt;/i&gt;&lt;/b&gt;`, `Correct. &lt;i&gt; is closed before &lt;b&gt;.`],
        [`&lt;b&gt;&lt;i&gt;Hello&lt;b&gt;&lt;i&gt;`, `No closing tags.`],
        [`&lt;/b&gt;&lt;i&gt;Hello&lt;b&gt;&lt;/i&gt;`, `Closing before opening.`]
      ], a: 1 },
    { q: `What does <code>&lt;html lang="ar-EG"&gt;</code> declare?`,
      o: [
        [`English language, Egypt country`, `"ar" is Arabic.`],
        [`Arabic language, Egypt country`, `Correct. First two letters = language, last two = country.`],
        [`Egypt language, Arabic country`, `Order is language-country.`],
        [`An Arabic font`, `lang does not choose a font.`]
      ], a: 1 },
    { q: `A page at <code>https://site.com/blog/post.html</code> contains <code>&lt;img src="/images/a.png"&gt;</code>. Which file is loaded?`,
      o: [
        [`https://site.com/blog/images/a.png`, `That would be the case without the leading slash.`],
        [`https://images/a.png`, `The domain is kept.`],
        [`https://site.com/images/a.png`, `Correct. A leading slash makes the path relative to the domain root.`],
        [`An external site's image`, `It is a relative URL within the same site.`]
      ], a: 2 },
    { q: `Which of these is an empty element (no end tag)?`,
      o: [
        [`&lt;p&gt;`, `Paragraphs have an end tag.`],
        [`&lt;title&gt;`, `Has an end tag.`],
        [`&lt;a&gt;`, `Has an end tag.`],
        [`&lt;hr&gt;`, `Correct. Like &lt;br&gt; and &lt;img&gt;, it has no content and no end tag.`]
      ], a: 3 },
    { q: `Where are attributes always written?`,
      o: [
        [`In the start tag`, `Correct. e.g. &lt;a href="..."&gt;.`],
        [`In the end tag`, `End tags take no attributes.`],
        [`Between the tags as content`, `Content is not an attribute.`],
        [`Only in the &lt;head&gt;`, `Any element can have attributes.`]
      ], a: 0 },
    { q: `Which element belongs in the &lt;body&gt; and NOT in the &lt;head&gt;?`,
      o: [
        [`&lt;title&gt;`, `Head element.`],
        [`&lt;meta charset="UTF-8"&gt;`, `Head element.`],
        [`&lt;h1&gt;`, `Correct. Headings are visible content.`],
        [`&lt;link rel="stylesheet"&gt;`, `Head element.`]
      ], a: 2 },
    { q: `What happens when the mouse hovers over <code>&lt;p title="Hi there"&gt;Text&lt;/p&gt;</code>?`,
      o: [
        [`The text changes to "Hi there"`, `The content is unchanged.`],
        [`A tooltip "Hi there" appears`, `Correct. title gives extra information shown as a tooltip.`],
        [`The browser tab title changes`, `That is the &lt;title&gt; element.`],
        [`Nothing; title is invalid on &lt;p&gt;`, `title works on all elements.`]
      ], a: 1 },
    { q: `Which statement about <code>&lt;!DOCTYPE html&gt;</code> is FALSE?`,
      o: [
        [`It must appear only once`, `True.`],
        [`It goes at the very top, before any HTML tags`, `True.`],
        [`It is not case sensitive`, `True.`],
        [`It is an HTML element that is displayed`, `Correct (this is the false statement). It is a declaration that helps browsers display the page; it is not displayed.`]
      ], a: 3 },
    { q: `Why should the page &lt;title&gt; be chosen carefully?`,
      o: [
        [`It affects the page's ranking in some search engines and appears in favorites, history and bookmarks`, `Correct (L2).`],
        [`It sets the page's font`, `Fonts are set with CSS.`],
        [`It is shown as the largest heading on the page`, `That is &lt;h1&gt;.`],
        [`It is required for images to load`, `Unrelated.`]
      ], a: 0 },
    { q: `An image fails to load because of a typo in src. What does the visitor see if alt="Logo" is set?`,
      o: [
        [`Nothing at all`, `The alternate text is shown.`],
        [`The text "Logo" in place of the image`, `Correct. That is the purpose of the required alt attribute.`],
        [`A tooltip only`, `That is the title attribute.`],
        [`An error message from the server`, `The browser shows the alt text.`]
      ], a: 1 }
  ],
  3: [
    { q: `A poem is typed on four lines inside a &lt;p&gt; element. How is it displayed?`,
      o: [
        [`On four lines in a fixed-width font`, `That is what &lt;pre&gt; does.`],
        [`On one line, extra spaces and line breaks collapsed`, `Correct. This is the "poem problem".`],
        [`It is not displayed`, `It is displayed, just not as typed.`],
        [`On four lines in bold`, `&lt;p&gt; does not keep line breaks.`]
      ], a: 1 },
    { q: `How does the browser show <code>My favorite color is &lt;del&gt;blue&lt;/del&gt; &lt;ins&gt;red&lt;/ins&gt;</code>?`,
      o: [
        [`"blue" struck through and "red" usually underlined`, `Correct. del = deleted text, ins = inserted text.`],
        [`"blue" bold and "red" italic`, `Those are b/strong and i/em.`],
        [`"blue" highlighted and "red" small`, `Those are mark and small.`],
        [`Both hidden`, `Both are visible.`]
      ], a: 0 },
    { q: `Which color is a shade of gray?`,
      o: [
        [`rgb(120, 60, 60)`, `Unequal values give a reddish color.`],
        [`rgb(0, 0, 255)`, `Pure blue.`],
        [`rgb(255, 99, 71)`, `Tomato.`],
        [`rgb(120, 120, 120)`, `Correct. Equal R, G, B values give gray.`]
      ], a: 3 },
    { q: `In <code>hsla(9, 100%, 64%, 0.2)</code>, what does 0.2 control?`,
      o: [
        [`Hue`, `Hue is the first value (9).`],
        [`Lightness`, `Lightness is 64%.`],
        [`Opacity (alpha): mostly transparent`, `Correct. Alpha ranges from 0 (fully transparent) to 1.`],
        [`Font size`, `Not a color value.`]
      ], a: 2 },
    { q: `Which inline style is written correctly with two properties?`,
      o: [
        [`style="color=red, font-size=20px"`, `CSS uses colons and semicolons.`],
        [`style="color:red; font-size:20px;"`, `Correct. property:value pairs separated by semicolons.`],
        [`style={color:red; font-size:20px}`, `Braces are for style sheets, not the attribute.`],
        [`style="red; 20px"`, `Property names are missing.`]
      ], a: 1 },
    { q: `Which element should you use to highlight a search term in yellow by default?`,
      o: [
        [`&lt;strong&gt;`, `Bold importance.`],
        [`&lt;em&gt;`, `Italic emphasis.`],
        [`&lt;mark&gt;`, `Correct. Marked/highlighted text.`],
        [`&lt;small&gt;`, `Smaller text.`]
      ], a: 2 },
    { q: `Which pair is semantic (meaningful) rather than only visual?`,
      o: [
        [`&lt;b&gt; and &lt;i&gt;`, `Purely visual bold/italic.`],
        [`&lt;u&gt; and &lt;small&gt;`, `Visual.`],
        [`&lt;sub&gt; and &lt;sup&gt;`, `Positioning of text.`],
        [`&lt;strong&gt; and &lt;em&gt;`, `Correct. Important and emphasized text.`]
      ], a: 3 },
    { q: `The text inside &lt;pre&gt; is displayed:`,
      o: [
        [`In a fixed-width font, keeping spaces and line breaks`, `Correct.`],
        [`In bold, removing spaces`, `pre does not bold or remove spaces.`],
        [`Hidden until hovered`, `No.`],
        [`As a horizontal rule`, `That is &lt;hr&gt;.`]
      ], a: 0 },
    { q: `Which one is NOT a text formatting element from the lecture's list?`,
      o: [
        [`&lt;small&gt;`, `In the list.`],
        [`&lt;section&gt;`, `Correct. section is a block-level structural element.`],
        [`&lt;sub&gt;`, `In the list.`],
        [`&lt;ins&gt;`, `In the list.`]
      ], a: 1 },
    { q: `Which value is the same color as the name "Tomato"?`,
      o: [
        [`#ff6347`, `Correct. = rgb(255, 99, 71) = hsl(9, 100%, 64%).`],
        [`#6347ff`, `Channels in the wrong order (bluish).`],
        [`rgb(99, 255, 71)`, `That is green.`],
        [`hsl(200, 100%, 64%)`, `Hue 200 is blue.`]
      ], a: 0 }
  ],
  4: [
    { q: `A &lt;p&gt; is red in the external file, blue in the internal &lt;style&gt;, and has style="color:green". Which color wins (all with simple selectors)?`,
      o: [
        [`Red`, `External rules have the lowest priority here.`],
        [`Blue`, `Internal rules lose to inline styles.`],
        [`Green`, `Correct. Inline styles override internal and external rules in the cascade.`],
        [`Black (conflict cancels them)`, `Conflicts are resolved by the cascade, not cancelled.`]
      ], a: 2 },
    { q: `<code>div {padding: 10px 20px;}</code> gives what left padding?`,
      o: [
        [`10px`, `10px is top and bottom.`],
        [`20px`, `Correct. Two values: top/bottom, then right/left.`],
        [`30px`, `Values are not added.`],
        [`0`, `The second value covers left and right.`]
      ], a: 1 },
    { q: `A div has width:100px; padding:10px; border:2px solid; margin:5px (default box sizing). How much horizontal space does it take in total?`,
      o: [
        [`100px`, `Only the content.`],
        [`124px`, `That is content + padding + border, without margins.`],
        [`134px`, `Correct. 100 + 2(10) + 2(2) + 2(5) = 134px.`],
        [`117px`, `Each side must be counted twice.`]
      ], a: 2 },
    { q: `Which rule styles only the element with id="main"?`,
      o: [
        [`.main {color: red;}`, `That targets class="main".`],
        [`main {color: red;}`, `That targets &lt;main&gt; elements.`],
        [`*main {color: red;}`, `Invalid.`],
        [`#main {color: red;}`, `Correct. # = id selector.`]
      ], a: 3 },
    { q: `What must an external style sheet file NOT contain?`,
      o: [
        [`CSS comments`, `Comments are allowed.`],
        [`HTML tags`, `Correct. The .css file must not contain any HTML code.`],
        [`Selectors`, `Selectors are required.`],
        [`Color values`, `Allowed.`]
      ], a: 1 },
    { q: `<code>h1, p {color: red;}</code> is an example of which selector?`,
      o: [
        [`Grouping selector`, `Correct. One rule for all h1 and all p.`],
        [`Descendant selector`, `That would be "h1 p" (p inside h1).`],
        [`Class selector`, `No dot.`],
        [`Universal selector`, `That is *.`]
      ], a: 0 },
    { q: `<code>&lt;link rel="stylesheet" href="/html/styles.css"&gt;</code> loads the style sheet from:`,
      o: [
        [`The same folder as the page`, `That is href="styles.css".`],
        [`The html folder at the root of the current web site`, `Correct. Leading slash = relative to the site root.`],
        [`An external site called html`, `No domain is given.`],
        [`It is invalid`, `It is valid.`]
      ], a: 1 },
    { q: `Which selector changes a link's background only while the mouse is over it?`,
      o: [
        [`a:visited`, `For visited links.`],
        [`a:active`, `While being clicked.`],
        [`a:link`, `Unvisited links.`],
        [`a:hover`, `Correct.`]
      ], a: 3 },
    { q: `Which part of the box model shows the element's background color?`,
      o: [
        [`Content and padding (up to the border)`, `Correct. The margin is transparent outside the border.`],
        [`Margin only`, `Margins are transparent.`],
        [`None of it`, `The background fills content and padding.`],
        [`Only the border`, `The border has its own color.`]
      ], a: 0 },
    { q: `Which CSS declaration removes the bullets from a navigation-bar list?`,
      o: [
        [`list-style-type: square;`, `Square bullets.`],
        [`text-decoration: none;`, `Removes underlines from links.`],
        [`list-style-type: none;`, `Correct.`],
        [`display: none;`, `That hides the whole list.`]
      ], a: 2 }
  ],
  5: [
    { q: `A table's first row is <code>&lt;tr&gt;&lt;td colspan="2"&gt;A&lt;/td&gt;&lt;td&gt;B&lt;/td&gt;&lt;td&gt;C&lt;/td&gt;&lt;/tr&gt;</code>. How many columns does the table have?`,
      o: [
        [`3`, `colspan="2" counts as two columns.`],
        [`4`, `Correct. 2 + 1 + 1 = 4.`],
        [`2`, `Too few.`],
        [`5`, `Too many.`]
      ], a: 1 },
    { q: `Row 1 of a 3-column table has a cell with rowspan="2". How many &lt;td&gt; cells should row 2 contain?`,
      o: [
        [`3`, `One position is already covered from row 1.`],
        [`1`, `Only one column is covered.`],
        [`2`, `Correct. 3 columns minus the one covered by the rowspan.`],
        [`4`, `Too many.`]
      ], a: 2 },
    { q: `What is the first marker of <code>&lt;ol type="I" start="4"&gt;</code>?`,
      o: [
        [`4`, `type="I" uses roman numbers.`],
        [`D`, `That is type="A".`],
        [`iv`, `Lowercase is type="i".`],
        [`IV`, `Correct. Uppercase roman numbering starting at 4.`]
      ], a: 3 },
    { q: `In a description list, which tag holds the term being described?`,
      o: [
        [`&lt;dt&gt;`, `Correct. &lt;dd&gt; holds its description, &lt;dl&gt; the whole list.`],
        [`&lt;dd&gt;`, `That is the description.`],
        [`&lt;dl&gt;`, `That is the list container.`],
        [`&lt;li&gt;`, `Used in ul/ol.`]
      ], a: 0 },
    { q: `How are &lt;th&gt; cells displayed by default?`,
      o: [
        [`Italic and right-aligned`, `No.`],
        [`Bold and centered`, `Correct.`],
        [`Underlined`, `No.`],
        [`Hidden`, `No.`]
      ], a: 1 },
    { q: `Which is the correct nested list?`,
      o: [
        [`&lt;ul&gt;&lt;li&gt;Tea&lt;/li&gt;&lt;ul&gt;&lt;li&gt;Green&lt;/li&gt;&lt;/ul&gt;&lt;/ul&gt;`, `The inner list should be inside an &lt;li&gt;.`],
        [`&lt;ul&gt;&lt;ul&gt;Tea&lt;/ul&gt;&lt;/ul&gt;`, `Items need &lt;li&gt;.`],
        [`&lt;ul&gt;&lt;li&gt;Tea&lt;ul&gt;&lt;li&gt;Green&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;`, `Correct. The inner &lt;ul&gt; is placed inside the "Tea" list item.`],
        [`&lt;li&gt;&lt;ul&gt;Tea&lt;/ul&gt;&lt;/li&gt;`, `No outer list.`]
      ], a: 2 },
    { q: `Which declaration gives every second row a gray background?`,
      o: [
        [`tr:nth-child(even) {background-color: #f2f2f2;}`, `Correct (striped/zebra rows).`],
        [`tr:even {background-color: #f2f2f2;}`, `:even is not a CSS pseudo-class.`],
        [`tr[2] {background-color: #f2f2f2;}`, `Not valid for this purpose.`],
        [`td + td {background-color: #f2f2f2;}`, `Targets cells, not alternate rows.`]
      ], a: 0 },
    { q: `Which tag adds a title shown above the table?`,
      o: [
        [`&lt;th&gt;`, `A header cell.`],
        [`&lt;title&gt;`, `The page title.`],
        [`&lt;thead&gt;`, `Groups header rows.`],
        [`&lt;caption&gt;`, `Correct.`]
      ], a: 3 },
    { q: `To set a specific column to 70% of the table width you add style="width:70%" to:`,
      o: [
        [`The &lt;table&gt; element`, `That sizes the whole table.`],
        [`A &lt;th&gt; or &lt;td&gt; of that column`, `Correct (L5 Table Column Width).`],
        [`The &lt;tr&gt; element`, `A tr style height sizes a row.`],
        [`The &lt;caption&gt;`, `Not used for widths.`]
      ], a: 1 },
    { q: `Which list type does <code>&lt;ul style="list-style-type:circle;"&gt;</code> produce?`,
      o: [
        [`Numbered list`, `ul is unordered.`],
        [`Square bullets`, `That is square.`],
        [`Hollow circle bullets`, `Correct.`],
        [`No markers`, `That is none.`]
      ], a: 2 }
  ],
  6: [
    { q: `Which of the following is an inline element?`,
      o: [
        [`&lt;div&gt;`, `Block-level.`],
        [`&lt;a&gt;`, `Correct. Links do not start on a new line.`],
        [`&lt;table&gt;`, `Block-level.`],
        [`&lt;h2&gt;`, `Block-level.`]
      ], a: 1 },
    { q: `You set <code>width:300px</code> on a &lt;span&gt; (default display). What happens?`,
      o: [
        [`The span becomes 300px wide`, `Inline elements do not accept width/height.`],
        [`The span starts on a new line`, `Width does not change display.`],
        [`An error is shown`, `CSS never shows errors.`],
        [`The width is ignored; the span stays as wide as its content`, `Correct (L6 table: width/height not allowed for inline).`]
      ], a: 3 },
    { q: `Which three references all display the euro sign?`,
      o: [
        [`&amp;euro; &amp;#8364; &amp;#x20AC;`, `Correct: entity name, decimal and hexadecimal.`],
        [`&amp;eur; &amp;#8364; &amp;#20AC;`, `The name is wrong and hex needs "x".`],
        [`&amp;euro; &amp;#20AC; &amp;#x8364;`, `Decimal and hex are swapped.`],
        [`&amp;EUR; &amp;#128512; &amp;#x20AC;`, `128512 is an emoji.`]
      ], a: 0 },
    { q: `Which line is valid XHTML?`,
      o: [
        [`&lt;IMG SRC="a.png" ALT="a"&gt;`, `Must be lowercase and closed.`],
        [`&lt;img src=a.png alt=a&gt;`, `Values must be quoted and the element closed.`],
        [`&lt;img src="a.png" alt="a" /&gt;`, `Correct. Lowercase, quoted, empty element closed.`],
        [`&lt;img src="a.png" alt="a"&gt;&lt;/IMG&gt;`, `Mixed case end tag is invalid.`]
      ], a: 2 },
    { q: `Three radio buttons let the user pick exactly one size. What must they share?`,
      o: [
        [`The same id`, `ids must be unique.`],
        [`The same value`, `Each value should differ to tell choices apart.`],
        [`The same name attribute`, `Correct. Radios with the same name form one group.`],
        [`The same label text`, `Labels describe each choice.`]
      ], a: 2 },
    { q: `How is a &lt;label&gt; bound to its &lt;input&gt;?`,
      o: [
        [`label for = input id`, `Correct. Clicking the label then toggles/focuses the input.`],
        [`label name = input name`, `Labels do not use name.`],
        [`label id = input for`, `Reversed.`],
        [`By writing them on the same line`, `Position does not bind them.`]
      ], a: 0 },
    { q: `Which method should a login form use, and why?`,
      o: [
        [`GET, because it is faster`, `GET puts the password in the URL.`],
        [`POST, because the data is sent in the request body, not shown in the URL`, `Correct.`],
        [`GET, because it can be bookmarked`, `Bookmarking a password is a security risk.`],
        [`No method is needed`, `Without method the form uses GET.`]
      ], a: 1 },
    { q: `When is the text between &lt;video&gt; and &lt;/video&gt; displayed?`,
      o: [
        [`Always, as a caption`, `Use &lt;track&gt; for captions.`],
        [`When the video ends`, `No.`],
        [`While the video loads`, `No.`],
        [`Only in browsers that do not support the &lt;video&gt; element`, `Correct.`]
      ], a: 3 },
    { q: `Which attributes make a video start by itself in modern browsers?`,
      o: [
        [`controls`, `Only shows the controls.`],
        [`autoplay muted`, `Correct. Add muted after autoplay to let the video start automatically.`],
        [`start="0"`, `Not a video attribute.`],
        [`loop`, `Repeats the video but does not start it.`]
      ], a: 1 },
    { q: `How do you remove the default border of an iframe?`,
      o: [
        [`style="border:none;"`, `Correct (L6).`],
        [`border="hidden"`, `Not the lecture's method.`],
        [`frame="0"`, `Not valid.`],
        [`style="outline:none;"`, `Outline is different from border.`]
      ], a: 0 }
  ],
  7: [
    { q: `What is printed?<pre>var a = 1;
{ var a = 2; }
console.log(a);</pre>`,
      o: [
        [`1`, `var is not block scoped, so the inner declaration is the same variable.`],
        [`2`, `Correct. var ignores the block; a becomes 2 (verified with node).`],
        [`undefined`, `a is defined.`],
        [`Error`, `Redeclaring with var is allowed.`]
      ], a: 1 },
    { q: `What is <code>typeof q</code> after <code>let q;</code>?`,
      o: [
        [`"null"`, `typeof never returns "null".`],
        [`"object"`, `That is typeof null.`],
        [`"undefined"`, `Correct. Declared but not initialized = undefined.`],
        [`Error`, `q is declared.`]
      ], a: 2 },
    { q: `What do <code>"3" + 4 + 5</code> and <code>3 + 4 + "5"</code> give?`,
      o: [
        [`"345" and "75"`, `Correct. Left to right: a string first makes everything concatenate; 3 + 4 = 7 is added before meeting "5" (verified with node).`],
        [`12 and 12`, `+ with strings concatenates.`],
        [`"345" and "345"`, `In the second, 3 + 4 is computed as numbers first.`],
        [`"39" and "75"`, `4 + 5 is not computed first in the first expression.`]
      ], a: 0 },
    { q: `Which is a real limitation of client-side JavaScript according to the lecture?`,
      o: [
        [`It cannot change HTML content`, `It can, with innerHTML.`],
        [`It cannot react to mouse events`, `It can (onclick, onmouseover...).`],
        [`It must be compiled before running`, `It is interpreted.`],
        [`It cannot read or write files`, `Correct. Kept for security reasons.`]
      ], a: 3 },
    { q: `Where should you put functions that run many times (e.g. event handlers) according to L7?`,
      o: [
        [`In the &lt;head&gt; section`, `Correct. They are interpreted when the function/handler is called.`],
        [`At the end of the CSS file`, `CSS cannot contain JS.`],
        [`Inside the &lt;title&gt;`, `Not allowed.`],
        [`Only in an &lt;iframe&gt;`, `No.`]
      ], a: 0 },
    { q: `Which output method is mainly used for debugging and is not visible on the page?`,
      o: [
        [`innerHTML`, `Writes into the page.`],
        [`document.write()`, `Writes into the page.`],
        [`console.log()`, `Correct. Visible in the browser console (Inspect).`],
        [`window.alert()`, `Shows a visible box.`]
      ], a: 2 },
    { q: `What happens?<pre>const c = 1;
c = 2;</pre>`,
      o: [
        [`c becomes 2`, `const cannot be reassigned.`],
        [`c stays 1 silently`, `An error is thrown.`],
        [`A SyntaxError at load time`, `It fails when the assignment runs.`],
        [`A TypeError: assignment to constant variable`, `Correct (verified with node).`]
      ], a: 3 },
    { q: `Which attribute loads JavaScript from a separate file?`,
      o: [
        [`&lt;script href="app.js"&gt;`, `href is for links and CSS.`],
        [`&lt;script src="app.js"&gt;&lt;/script&gt;`, `Correct.`],
        [`&lt;link rel="script" href="app.js"&gt;`, `link is for style sheets.`],
        [`&lt;js file="app.js"&gt;`, `No such element.`]
      ], a: 1 },
    { q: `Which variable name is valid in JavaScript?`,
      o: [
        [`$total`, `Correct. Names may start with $, _ or a letter.`],
        [`2total`, `Cannot start with a digit.`],
        [`total-price`, `- is the minus operator.`],
        [`let`, `Reserved word.`]
      ], a: 0 },
    { q: `"JavaScript = ECMAScript + ____"`,
      o: [
        [`CSS`, `CSS is the presentation layer.`],
        [`PHP`, `Server-side language.`],
        [`DOM API`, `Correct. Language specification plus communication with HTML.`],
        [`HTTP`, `A protocol.`]
      ], a: 2 }
  ],
  8: [
    { q: `What is y?<pre>let x = 5;
let y = x++ + ++x;</pre>`,
      o: [
        [`11`, `The second operand sees x already incremented twice.`],
        [`12`, `Correct. x++ gives 5 (x becomes 6), ++x makes 7: 5 + 7 = 12 (verified with node).`],
        [`10`, `++x adds one before using x.`],
        [`13`, `Too large.`]
      ], a: 1 },
    { q: `What do <code>"10" == 10</code> and <code>"10" === 10</code> give?`,
      o: [
        [`true, true`, `=== also checks the type.`],
        [`false, false`, `== converts the string.`],
        [`false, true`, `Reversed.`],
        [`true, false`, `Correct.`]
      ], a: 3 },
    { q: `What is s?<pre>let s = 0;
for (let i = 1; i &lt;= 5; i += 2) s += i;</pre>`,
      o: [
        [`9`, `Correct. i = 1, 3, 5: 1 + 3 + 5 = 9.`],
        [`15`, `Only odd values are visited.`],
        [`6`, `5 is included (i &lt;= 5).`],
        [`4`, `Too small.`]
      ], a: 0 },
    { q: `What is i after the loop?<pre>let i = 10;
do { i++; } while (i &lt; 5);</pre>`,
      o: [
        [`10`, `do...while runs the body at least once.`],
        [`5`, `The condition is false from the start.`],
        [`11`, `Correct. The body runs once, then 11 &lt; 5 is false.`],
        [`Infinite loop`, `The condition is false.`]
      ], a: 2 },
    { q: `What does <code>[1, 2, 3, 4].splice(1, 2)</code> return?`,
      o: [
        [`[1, 4]`, `That is what remains in the array.`],
        [`[2, 3]`, `Correct. splice returns the removed elements.`],
        [`[2]`, `Two elements are removed.`],
        [`2`, `It returns an array, not a count.`]
      ], a: 1 },
    { q: `What does <code>[1, 2].push(5, 6)</code> return?`,
      o: [
        [`[1, 2, 5, 6]`, `That is the new array, but push returns the length.`],
        [`6`, `That is the last element added.`],
        [`undefined`, `push returns a value.`],
        [`4`, `Correct. The new length.`]
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
        [`"bcd"`, `The break after 'c' stops before default.`],
        [`"bc"`, `Correct (verified with node).`],
        [`"abc"`, `Matching starts at case 'B'.`]
      ], a: 2 },
    { q: `What does <code>[10, 1, 3].sort()</code> give?`,
      o: [
        [`[1, 3, 10]`, `That needs sort((a, b) =&gt; a - b).`],
        [`[1, 10, 3]`, `Correct. Default sort compares strings: "1" &lt; "10" &lt; "3".`],
        [`[10, 3, 1]`, `Not descending.`],
        [`[3, 1, 10]`, `No.`]
      ], a: 1 },
    { q: `What is <code>[5, 6, 7].indexOf(9)</code>?`,
      o: [
        [`-1`, `Correct. -1 means not found.`],
        [`0`, `0 is the index of 5.`],
        [`undefined`, `indexOf returns a number.`],
        [`3`, `Not the length.`]
      ], a: 0 },
    { q: `What does <code>new Array(3)</code> create?`,
      o: [
        [`An array containing the number 3`, `A single numeric argument sets the size.`],
        [`An error`, `Valid.`],
        [`An empty array of length 3`, `Correct (L8: constructor with a single numeric argument = size).`],
        [`[0, 1, 2]`, `Elements are empty, not numbered.`]
      ], a: 2 }
  ],
  9: [
    { q: `What is <code>"JavaScript".charAt(4)</code>?`,
      o: [
        [`"a"`, `Index 3 is "a".`],
        [`"S"`, `Correct. J=0, a=1, v=2, a=3, S=4.`],
        [`"c"`, `Index 5.`],
        [`83`, `That would be charCodeAt(4).`]
      ], a: 1 },
    { q: `What is <code>"a,b,c".split(",").length</code>?`,
      o: [
        [`5`, `Commas are removed.`],
        [`1`, `The string is split.`],
        [`2`, `There are three parts.`],
        [`3`, `Correct. ["a", "b", "c"].`]
      ], a: 3 },
    { q: `What are <code>Math.ceil(-2.5)</code> and <code>Math.floor(-2.5)</code>?`,
      o: [
        [`-2 and -3`, `Correct. ceil goes up (toward +infinity), floor goes down (verified with node).`],
        [`-3 and -2`, `Reversed.`],
        [`-2 and -2`, `floor goes down to -3.`],
        [`2 and 3`, `The sign is kept.`]
      ], a: 0 },
    { q: `What is <code>typeof JSON.stringify({a: 1})</code>?`,
      o: [
        [`"object"`, `stringify produces a string.`],
        [`"json"`, `Not a JS type.`],
        [`"string"`, `Correct. JSON.parse converts it back to an object.`],
        [`"number"`, `No.`]
      ], a: 2 },
    { q: `<code>const add = (a, b = 2) =&gt; a + b;</code> What are add(3) and add(3, 4)?`,
      o: [
        [`NaN and 7`, `b has a default value, so it is not undefined.`],
        [`5 and 7`, `Correct. Default parameter b = 2 is used only when b is missing.`],
        [`3 and 7`, `b defaults to 2, not 0.`],
        [`5 and 5`, `A passed argument replaces the default.`]
      ], a: 1 },
    { q: `When does a self-invoked function run?`,
      o: [
        [`Only when called by name`, `It has no name to call.`],
        [`On the onload event`, `Not tied to events.`],
        [`Never`, `It runs.`],
        [`Immediately where it is defined: (function(){ ... })();`, `Correct.`]
      ], a: 3 },
    { q: `A user saves a color with localStorage, closes the browser and opens the site the next day. What happens?`,
      o: [
        [`The color is still saved`, `Correct. localStorage has no expiration date.`],
        [`The color is lost`, `That would be sessionStorage.`],
        [`The color moves to the server`, `Storage is in the browser.`],
        [`An error occurs`, `No.`]
      ], a: 0 },
    { q: `Which event fits "show what the user types in a paragraph, letter by letter"?`,
      o: [
        [`onload`, `Fires once when the page loads.`],
        [`onkeyup`, `Correct. Fires each time a key is released (L9 example).`],
        [`onresize`, `Window resizing.`],
        [`ondblclick`, `Double-click.`]
      ], a: 1 },
    { q: `What is printed?<pre>let o = {a: 1, b: 2};
delete o.a;
console.log(Object.keys(o).length);</pre>`,
      o: [
        [`2`, `delete removed a.`],
        [`0`, `b remains.`],
        [`1`, `Correct. Only b is left.`],
        [`undefined`, `length is a number.`]
      ], a: 2 },
    { q: `Which built-in function executes a string as JavaScript code?`,
      o: [
        [`escape`, `Encodes characters as %xx.`],
        [`isFinite`, `Tests for a valid number.`],
        [`parseInt`, `Parses an integer.`],
        [`eval`, `Correct. Returns the value of the last statement, e.g. eval("2*3") = 6.`]
      ], a: 3 }
  ],
  10: [
    { q: `What does this print?<pre>$x = "5";
$y = $x + 3;
echo $y;</pre>`,
      o: [
        [`8`, `Correct. The string "5" is converted to a number on +.`],
        [`53`, `PHP concatenation uses ".", not "+".`],
        [`"5"3`, `No.`],
        [`Error`, `PHP converts automatically.`]
      ], a: 0 },
    { q: `What does this print?<pre>$a = 10;
$a .= 5;
echo $a;</pre>`,
      o: [
        [`15`, `.= concatenates, it does not add.`],
        [`105`, `Correct. "10" . "5" = "105".`],
        [`50`, `Not multiplication.`],
        [`Error`, `Valid.`]
      ], a: 1 },
    { q: `With <code>$n = 5;</code>, what does <code>echo "Value: {$n}0";</code> print?`,
      o: [
        [`Value: $n0`, `Double quotes interpolate.`],
        [`Value: 5`, `The 0 after the braces is printed too.`],
        [`Value: 50`, `Correct. Braces separate the variable name from the following "0".`],
        [`Value: {5}0`, `Braces are not printed.`]
      ], a: 2 },
    { q: `What does <code>echo 'Line\\n';</code> print?`,
      o: [
        [`Line followed by a new line`, `Single quotes do not interpret \\n.`],
        [`Line`, `The backslash and n are printed.`],
        [`Nothing`, `It prints text.`],
        [`Line\\n (literally)`, `Correct. Single-quoted strings are not interpreted.`]
      ], a: 3 },
    { q: `What does <code>isset($never_assigned)</code> return?`,
      o: [
        [`false`, `Correct. An undefined variable is NULL, so isset is false.`],
        [`true`, `Only set, non-NULL variables give true.`],
        [`NULL`, `isset returns a boolean.`],
        [`An error`, `isset never errors on undefined variables.`]
      ], a: 0 },
    { q: `What do <code>echo true;</code> and <code>echo false;</code> print?`,
      o: [
        [`true and false`, `PHP prints booleans as numbers/empty.`],
        [`1 and 0`, `FALSE prints nothing, not 0.`],
        [`1 and nothing (empty string)`, `Correct (L10).`],
        [`TRUE and FALSE`, `No.`]
      ], a: 2 },
    { q: `What does <code>echo strtoupper(substr("webprog", 3, 4));</code> print?`,
      o: [
        [`PROG`, `Correct. substr from index 3, 4 characters = "prog", then uppercase.`],
        [`BPRO`, `Index 3 is "p" (w=0, e=1, b=2).`],
        [`PRO`, `4 characters are taken.`],
        [`WEBP`, `That is substr(0, 4).`]
      ], a: 0 },
    { q: `What does this print?<pre>$arr = [3, 1, 2];
sort($arr);
echo implode(",", $arr);</pre>`,
      o: [
        [`3,1,2`, `sort changes the array in place.`],
        [`3,2,1`, `sort is ascending.`],
        [`Array`, `implode joins the elements into a string.`],
        [`1,2,3`, `Correct.`]
      ], a: 3 },
    { q: `Which is NOT a characteristic of server-side programming listed in L10?`,
      o: [
        [`Access databases and return results to the browser`, `Listed.`],
        [`Respond to data submitted from HTML forms`, `Listed.`],
        [`Animate elements in the browser without contacting the server`, `Correct. That is client-side JavaScript/CSS.`],
        [`Provide security because the code cannot be viewed from the browser`, `Listed.`]
      ], a: 2 },
    { q: `After <code>define("RATE", 5);</code>, which line prints 5?`,
      o: [
        [`echo $RATE;`, `$RATE is an undefined variable.`],
        [`echo RATE;`, `Correct. Constants are used without $.`],
        [`echo "RATE";`, `Prints the text RATE.`],
        [`echo define(RATE);`, `define creates constants; it does not read them.`]
      ], a: 1 }
  ]
};
