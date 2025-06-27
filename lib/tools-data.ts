export type IconName =
  | "Key"
  | "Hash"
  | "Link"
  | "QrCode"
  | "FileText"
  | "Type"
  | "Shield"
  | "Mail"
  | "Image"
  | "Palette"
  | "Video"
  | "Music"
  | "Code"
  | "Database"
  | "DollarSign"
  | "TrendingUp"
  | "Calculator"
  | "Receipt"
  | "Cloud"
  | "ChefHat"
  | "Ruler"
  | "Clock"
  | "MapPin"
  | "Paintbrush"
  | "Zap"
  | "Sparkles"
  | "Monitor"
  | "Font"
  | "FileType"
  | "GitCompare"
  | "FileDown"
  | "Mic"
  | "Smile"
  | "Quote"
  | "Dice1"
  | "Lock"
  | "Eye"
  | "Layers"
  | "AtSign"
  | "BarChart3"
  | "FileSpreadsheet"
  | "Crop"
  | "Droplets"
  | "ImageIcon"
  | "FileImage"
  | "FilePlus"
  | "Scissors"
  | "Compress"
  | "FileType2"
  | "FileText2"

export interface Tool {
  id: string
  name: string
  description: string
  category: string
  iconName: IconName
  isPremium: boolean
  credits: number
  slug: string
  tags?: string[];
}

export const tools: Tool[] = [
  // Security & Encryption Tools
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Generate secure, customizable passwords with advanced options",
    category: "security",
    iconName: "Key",
    isPremium: false,
    credits: 1,
    slug: "password-generator",
  },
  {
    id: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, and other hash algorithms",
    category: "security",
    iconName: "Hash",
    isPremium: false,
    credits: 1,
    slug: "hash-generator",
  },
  {
    id: "file-encryptor",
    name: "File Encryptor",
    description: "Encrypt and decrypt files with AES-256 encryption",
    category: "security",
    iconName: "Shield",
    isPremium: true,
    credits: 5,
    slug: "file-encryptor",
  },
  {
    id: "email-breach-checker",
    name: "Email Breach Checker",
    description: "Check if your email has been compromised in data breaches",
    category: "security",
    iconName: "Mail",
    isPremium: true,
    credits: 2,
    slug: "email-breach-checker",
  },
  {
    id: "md5-decrypt",
    name: "MD5 Decrypt",
    description: "Attempt to decrypt MD5 hashes using rainbow tables",
    category: "security",
    iconName: "Lock",
    isPremium: true,
    credits: 3,
    slug: "md5-decrypt",
  },
  {
    id: "steganography-tool",
    name: "Steganography Tool",
    description: "Hide and extract secret messages in images",
    category: "security",
    iconName: "Eye",
    isPremium: true,
    credits: 4,
    slug: "steganography-tool",
  },
  {
    id: "batch-decryption",
    name: "Batch Decryption",
    description: "Decrypt multiple files or text strings at once",
    category: "security",
    iconName: "Layers",
    isPremium: true,
    credits: 6,
    slug: "batch-decryption",
  },

  // Productivity Tools
  {
    id: "url-shortener",
    name: "URL Shortener",
    description: "Create short, trackable links with custom aliases",
    category: "productivity",
    iconName: "Link",
    isPremium: false,
    credits: 1,
    slug: "url-shortener",
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes for URLs, text, WiFi, and more",
    category: "productivity",
    iconName: "QrCode",
    isPremium: false,
    credits: 1,
    slug: "qr-code-generator",
  },
  {
    id: "text-counter",
    name: "Text Counter",
    description: "Count characters, words, sentences, and analyze text",
    category: "productivity",
    iconName: "FileText",
    isPremium: false,
    credits: 1,
    slug: "text-counter",
  },
  {
    id: "case-converter",
    name: "Case Converter",
    description: "Convert text between different cases (upper, lower, title, etc.)",
    category: "productivity",
    iconName: "Type",
    isPremium: false,
    credits: 1,
    slug: "case-converter",
  },
  {
    id: "custom-aliases",
    name: "Custom Aliases",
    description: "Create and manage custom short URLs with analytics",
    category: "productivity",
    iconName: "AtSign",
    isPremium: true,
    credits: 2,
    slug: "custom-aliases",
  },
  {
    id: "barcode-generator",
    name: "Barcode Generator",
    description: "Generate various types of barcodes for products",
    category: "productivity",
    iconName: "BarChart3",
    isPremium: true,
    credits: 2,
    slug: "barcode-generator",
  },
  {
    id: "invoice-generator",
    name: "Invoice Generator",
    description: "Create professional invoices and receipts",
    category: "productivity",
    iconName: "FileSpreadsheet",
    isPremium: true,
    credits: 3,
    slug: "invoice-generator",
  },

  // Media Processing Tools
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Compress images while maintaining quality",
    category: "media",
    iconName: "Image",
    isPremium: false,
    credits: 2,
    slug: "image-compressor",
  },
  {
    id: "color-picker",
    name: "Color Picker",
    description: "Pick colors from images and get hex, RGB, HSL values",
    category: "media",
    iconName: "Palette",
    isPremium: false,
    credits: 1,
    slug: "color-picker",
  },
  {
    id: "video-converter",
    name: "Video Converter",
    description: "Convert videos between different formats",
    category: "media",
    iconName: "Video",
    isPremium: true,
    credits: 10,
    slug: "video-converter",
  },
  {
    id: "audio-converter",
    name: "Audio Converter",
    description: "Convert audio files between formats",
    category: "media",
    iconName: "Music",
    isPremium: true,
    credits: 5,
    slug: "audio-converter",
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to specific dimensions",
    category: "media",
    iconName: "Crop",
    isPremium: true,
    credits: 2,
    slug: "image-resizer",
  },
  {
    id: "watermark-remover",
    name: "Watermark Remover",
    description: "Remove watermarks from images using AI",
    category: "media",
    iconName: "Droplets",
    isPremium: true,
    credits: 8,
    slug: "watermark-remover",
  },
  {
    id: "background-remover",
    name: "Background Remover",
    description: "Remove backgrounds from images automatically",
    category: "media",
    iconName: "ImageIcon",
    isPremium: true,
    credits: 6,
    slug: "background-remover",
  },
  {
    id: "image-format-converter",
    name: "Image Format Converter",
    description: "Convert images between PNG, JPG, WebP, and more",
    category: "media",
    iconName: "FileImage",
    isPremium: true,
    credits: 2,
    slug: "image-format-converter",
  },
  {
    id: "pdf-merger",
    name: "PDF Merger",
    description: "Merge multiple PDF files into one document",
    category: "media",
    iconName: "FilePlus",
    isPremium: true,
    credits: 3,
    slug: "pdf-merger",
  },
  {
    id: "pdf-splitter",
    name: "PDF Splitter",
    description: "Split PDF files into separate pages or sections",
    category: "media",
    iconName: "Scissors",
    isPremium: true,
    credits: 3,
    slug: "pdf-splitter",
  },
  {
    id: "pdf-compressor",
    name: "PDF Compressor",
    description: "Reduce PDF file size while maintaining quality",
    category: "media",
    iconName: "Compress",
    isPremium: true,
    credits: 4,
    slug: "pdf-compressor",
  },
  {
    id: "pdf-to-word",
    name: "PDF to Word",
    description: "Convert PDF documents to editable Word files",
    category: "media",
    iconName: "FileType2",
    isPremium: true,
    credits: 5,
    slug: "pdf-to-word",
  },
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    description: "Convert Word documents to PDF format",
    category: "media",
    iconName: "FileText2",
    isPremium: true,
    credits: 3,
    slug: "word-to-pdf",
  },

  // Development Tools
  {
    id: "json-validator",
    name: "JSON Validator",
    description: "Validate and format JSON data with error highlighting",
    category: "development",
    iconName: "Code",
    isPremium: false,
    credits: 1,
    slug: "json-validator",
  },
  {
    id: "xml-formatter",
    name: "XML Formatter",
    description: "Format and validate XML documents",
    category: "development",
    iconName: "Code",
    isPremium: false,
    credits: 1,
    slug: "xml-formatter",
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings",
    category: "development",
    iconName: "Code",
    isPremium: false,
    credits: 1,
    slug: "base64-encoder",
  },
  {
    id: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Encode and decode URLs and query parameters",
    category: "development",
    iconName: "Link",
    isPremium: false,
    credits: 1,
    slug: "url-encoder",
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test and debug regular expressions with live matching",
    category: "development",
    iconName: "Code",
    isPremium: true,
    credits: 2,
    slug: "regex-tester",
  },
  {
    id: "api-tester",
    name: "API Tester",
    description: "Test REST APIs with custom headers and payloads",
    category: "development",
    iconName: "Database",
    isPremium: true,
    credits: 3,
    slug: "api-tester",
  },
  {
    id: "minifier",
    name: "Code Minifier",
    description: "Minify CSS, JavaScript, and HTML code",
    category: "development",
    iconName: "Code",
    isPremium: true,
    credits: 2,
    slug: "minifier",
  },
  {
    id: "sql-formatter",
    name: "SQL Formatter",
    description: "Format and beautify SQL queries",
    category: "development",
    iconName: "Database",
    isPremium: true,
    credits: 2,
    slug: "sql-formatter",
  },

  // Finance & Business Tools
  {
    id: "currency-converter",
    name: "Currency Converter",
    description: "Convert between different currencies with live rates",
    category: "finance",
    iconName: "DollarSign",
    isPremium: false,
    credits: 1,
    slug: "currency-converter",
  },
  {
    id: "stock-tracker",
    name: "Stock Tracker",
    description: "Track stock prices and market data",
    category: "finance",
    iconName: "TrendingUp",
    isPremium: true,
    credits: 2,
    slug: "stock-tracker",
  },
  {
    id: "loan-calculator",
    name: "Loan Calculator",
    description: "Calculate loan payments, interest, and amortization",
    category: "finance",
    iconName: "Calculator",
    isPremium: false,
    credits: 1,
    slug: "loan-calculator",
  },
  {
    id: "tax-calculator",
    name: "Tax Calculator",
    description: "Calculate income tax and deductions",
    category: "finance",
    iconName: "Receipt",
    isPremium: true,
    credits: 2,
    slug: "tax-calculator",
  },

  // Lifestyle & Fun Tools
  {
    id: "weather-forecast",
    name: "Weather Forecast",
    description: "Get detailed weather forecasts for any location",
    category: "lifestyle",
    iconName: "Cloud",
    isPremium: false,
    credits: 1,
    slug: "weather-forecast",
  },
  {
    id: "recipe-finder",
    name: "Recipe Finder",
    description: "Find recipes based on ingredients you have",
    category: "lifestyle",
    iconName: "ChefHat",
    isPremium: true,
    credits: 2,
    slug: "recipe-finder",
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert between different units of measurement",
    category: "lifestyle",
    iconName: "Ruler",
    isPremium: false,
    credits: 1,
    slug: "unit-converter",
  },
  {
    id: "timezone-converter",
    name: "Timezone Converter",
    description: "Convert time between different timezones",
    category: "lifestyle",
    iconName: "Clock",
    isPremium: false,
    credits: 1,
    slug: "timezone-converter",
  },
  {
    id: "ip-lookup",
    name: "IP Lookup",
    description: "Get location and ISP information for IP addresses",
    category: "lifestyle",
    iconName: "MapPin",
    isPremium: true,
    credits: 2,
    slug: "ip-lookup",
  },
  {
    id: "color-palette-generator",
    name: "Color Palette Generator",
    description: "Generate beautiful color palettes for design",
    category: "lifestyle",
    iconName: "Paintbrush",
    isPremium: false,
    credits: 1,
    slug: "color-palette-generator",
  },
  {
    id: "logo-maker",
    name: "Logo Maker",
    description: "Create professional logos with AI assistance",
    category: "lifestyle",
    iconName: "Zap",
    isPremium: true,
    credits: 10,
    slug: "logo-maker",
  },
  {
    id: "gradient-generator",
    name: "Gradient Generator",
    description: "Create CSS gradients with live preview",
    category: "lifestyle",
    iconName: "Sparkles",
    isPremium: false,
    credits: 1,
    slug: "gradient-generator",
  },
  {
    id: "icon-generator",
    name: "Icon Generator",
    description: "Generate custom icons and favicons",
    category: "lifestyle",
    iconName: "Sparkles",
    isPremium: true,
    credits: 5,
    slug: "icon-generator",
  },
  {
    id: "mockup-generator",
    name: "Mockup Generator",
    description: "Create device mockups for your designs",
    category: "lifestyle",
    iconName: "Monitor",
    isPremium: true,
    credits: 4,
    slug: "mockup-generator",
  },
  {
    id: "font-pairing",
    name: "Font Pairing",
    description: "Find perfect font combinations for your projects",
    category: "lifestyle",
    iconName: "Font",
    isPremium: true,
    credits: 2,
    slug: "font-pairing",
  },
  {
    id: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs",
    category: "lifestyle",
    iconName: "FileType",
    isPremium: false,
    credits: 1,
    slug: "lorem-ipsum",
  },
  {
    id: "text-diff",
    name: "Text Diff",
    description: "Compare two texts and highlight differences",
    category: "lifestyle",
    iconName: "GitCompare",
    isPremium: false,
    credits: 1,
    slug: "text-diff",
  },
  {
    id: "markdown-converter",
    name: "Markdown Converter",
    description: "Convert Markdown to HTML and vice versa",
    category: "lifestyle",
    iconName: "FileDown",
    isPremium: false,
    credits: 1,
    slug: "markdown-converter",
  },
  {
    id: "song-lyrics-finder",
    name: "Song Lyrics Finder",
    description: "Find lyrics for any song",
    category: "lifestyle",
    iconName: "Mic",
    isPremium: true,
    credits: 2,
    slug: "song-lyrics-finder",
  },
  {
    id: "meme-generator",
    name: "Meme Generator",
    description: "Create memes with custom text and images",
    category: "lifestyle",
    iconName: "Smile",
    isPremium: false,
    credits: 2,
    slug: "meme-generator",
  },
  {
    id: "random-quote",
    name: "Random Quote",
    description: "Get inspirational quotes and save favorites",
    category: "lifestyle",
    iconName: "Quote",
    isPremium: false,
    credits: 1,
    slug: "random-quote",
  },
  {
    id: "dice-roller",
    name: "Dice Roller",
    description: "Roll virtual dice for games and decisions",
    category: "lifestyle",
    iconName: "Dice1",
    isPremium: false,
    credits: 1,
    slug: "dice-roller",
  },
]

export const categories = [
  {
    id: "security",
    name: "Security & Encryption",
    description: "Tools for password generation, hashing, and security analysis",
    iconName: "Shield" as IconName,
    color: "bg-red-500",
    count: tools.filter((t) => t.category === "security").length,
  },
  {
    id: "productivity",
    name: "Productivity",
    description: "Text processing, URL management, and workflow tools",
    iconName: "Zap" as IconName,
    color: "bg-blue-500",
    count: tools.filter((t) => t.category === "productivity").length,
  },
  {
    id: "media",
    name: "Media Processing",
    description: "Image, video, and audio conversion tools",
    iconName: "Image" as IconName,
    color: "bg-purple-500",
    count: tools.filter((t) => t.category === "media").length,
  },
  {
    id: "development",
    name: "Development",
    description: "Code formatting, API testing, and developer utilities",
    iconName: "Code" as IconName,
    color: "bg-green-500",
    count: tools.filter((t) => t.category === "development").length,
  },
  {
    id: "finance",
    name: "Finance & Business",
    description: "Calculators, converters, and business tools",
    iconName: "DollarSign" as IconName,
    color: "bg-yellow-500",
    count: tools.filter((t) => t.category === "finance").length,
  },
  {
    id: "lifestyle",
    name: "Lifestyle & Fun",
    description: "Entertainment, games, and lifestyle utilities",
    iconName: "Smile" as IconName,
    color: "bg-pink-500",
    count: tools.filter((t) => t.category === "lifestyle").length,
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug)
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((tool) => tool.category === category)
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((tool) => !tool.isPremium).slice(0, 6)
}

export function getPremiumTools(): Tool[] {
  return tools.filter((tool) => tool.isPremium)
}
