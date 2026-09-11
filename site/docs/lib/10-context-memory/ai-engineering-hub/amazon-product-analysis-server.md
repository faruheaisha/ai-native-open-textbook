---
title: "Amazon Product Analysis MCP Server"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/README.md"
zh: ""
---

# Amazon Product Analysis MCP Server

A production-ready Model Context Protocol (MCP) server for Amazon product analysis, **built with [mcp-use](https://github.com/mcp-use/mcp-use)** and **powered by [Bright Data](https://brightdata.com)** for Web MCP tool. This server provides an interactive tool and beautiful React widget for analyzing Amazon products with comprehensive insights including pricing, features, specifications, delivery options, and customer reviews.

## 🚀 Built with mcp-use

This MCP server is powered by **[mcp-use](https://github.com/mcp-use/mcp-use)**, a modern framework for building MCP servers with:

- **Type-safe server creation** - Build MCP servers with full TypeScript support
- **React widget support** - Create interactive UI components using the OpenAI Apps SDK
- **Simplified client connections** - Easily connect to other MCP servers
- **Built-in development tools** - Hot reload, build, and deploy commands
- **Zero boilerplate** - Focus on your tools, not infrastructure

## Features

- 🛒 **Amazon Product Analysis** - Extract comprehensive product data from any Amazon URL
- 🎨 **Interactive Widget** - Beautiful React widget for displaying product insights
- 📊 **Rich Data Extraction** - Pricing, features, specifications, delivery, reviews, and seller info

## Prerequisites

- A Bright Data account ([sign up here](https://brightdata.com))
- An OpenAI API key ([get one here](https://platform.openai.com/api-keys))

## Installation

```bash
# Install dependencies
yarn install
# or
npm install
```

## Configuration

1. Copy the environment example file:

```bash
cp .env.example .env
```

2. Set the following required environment variables:

```bash
# Required: Your Bright Data API Key
BRIGHTDATA_API_KEY=your_brightdata_api_key_here

# Required: Your OpenAI API Key
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here
```

## Development

[mcp-use](https://github.com/mcp-use/mcp-use) provides convenient development commands:

```bash
# Start development server with hot reload
yarn dev
# or
npm run dev

# Build for production
yarn build
# or
npm run build

# Start production server
yarn start
# or
npm start

# Deploy the server
yarn deploy
# or
npm run deploy
```

The development server starts:

- MCP server on port 3000
- Widget serving at `/mcp-use/widgets/*`
- Inspector UI at `/inspector`

## Available Tools

### `amazon-product-analysis`

Analyze any Amazon product URL. Opens an interactive widget displaying comprehensive product insights.

**Parameters:**

- `url` (required): Amazon product URL (must contain valid full URL of the product page)
- `zipcode` (optional): ZIP code for location-specific pricing and delivery

**Widget:** `amazon-product-analysis` - Interactive product analysis display

**Returns:** Structured product data including:

- Product info (title, image, price, rating, reviews)
- Pricing breakdown (original price, discount, savings)
- Product features
- Specifications
- Delivery options
- Seller information
- Customer reviews summary
- Category rankings

## UI Widgets

This server includes a custom React widget built with [mcp-use](https://github.com/mcp-use/mcp-use):

### Amazon Product Analysis (`amazon-product-analysis`)

An interactive widget for displaying product insights:

- **Product Card** - Title, image, price, and star rating
- **Image Gallery** - Zoomable carousel with thumbnails
- **Pricing Deal** - Original price, discount percentage, savings
- **Features List** - Key product features
- **Delivery Info** - Standard and fast shipping options
- **Seller Info** - Seller name, rankings, categories
- **Customer Reviews** - Review summary and top review
- **Product Specs** - Technical specifications table

The widget is built with:

- React 19
- Tailwind CSS
- TanStack Query
- Zod validation
- OpenAI Apps SDK hooks

## Architecture

This server demonstrates the power of [mcp-use](https://github.com/mcp-use/mcp-use):

- **Server-side**: Uses [`mcp-use/server`](https://github.com/mcp-use/mcp-use) to create tools and widgets
- **Client-side**: Uses [`mcp-use/react`](https://github.com/mcp-use/mcp-use) for widget hooks
- **Type-safe**: Full TypeScript support with Zod schemas
- **Bright Data Integration**: Amazon product scraping via Bright Data SDK
- **OpenAI Integration**: GPT-4o for intelligent data extraction

### Data Flow

```
User → ChatGPT → MCP Server → amazon-product-analysis tool
                                       ↓
                              Bright Data SDK
                                       ↓
                                 Amazon Website
                                       ↓
                              GPT-4o Data Extraction
                                       ↓
                                Widget Display
                                       ↓
                            Product Insights UI
```

## Project Structure

```
amazon-product-analysis-server/
├── index.ts                              # Main server file with API endpoints
├── resources/
│   └── amazon-product-analysis/
│       ├── widget.tsx                    # Main widget component
│       ├── types.ts                      # Zod schemas and TypeScript types
│       ├── server.ts                     # Server-side analysis logic
│       ├── brightdata-tools.ts           # Bright Data integration
│       ├── utils.ts                      # Utility functions (image proxy)
│       ├── hooks/
│       │   └── useProductAnalysis.ts     # React Query hook
│       └── components/
│           ├── ProductCard.tsx           # Product display
│           ├── ImageGallery.tsx          # Image carousel
│           ├── PricingDeal.tsx           # Price info
│           ├── Features.tsx              # Features list
│           ├── DeliveryInfo.tsx          # Shipping options
│           ├── SellerInfo.tsx            # Seller details
│           ├── CustomerReviews.tsx       # Reviews summary
│           └── ProductSpecs.tsx          # Specifications
├── package.json                          # Dependencies
├── tsconfig.json                         # TypeScript configuration
└── README.md                             # This file
```

## Deployment

### mcp-use Cloud

```bash
# Install the CLI (if not already done)
npm install -g @mcp-use/cli

# Login to mcp-use cloud
npm run mcp-use login

# Deploy your server
npm run mcp-use deploy
```

### Other Platforms

The server can be deployed to any Node.js hosting platform:

- Vercel
- Railway
- Render
- Fly.io
- AWS Lambda (with adapter)
- Google Cloud Run

Make sure to set the `MCP_URL` environment variable to your production URL.

## Usage in ChatGPT

1. Deploy your application and get the MCP endpoint URL (e.g., `https://your-app.vercel.app/mcp`)
2. In ChatGPT, go to `Apps & Connectors` → `Advanced Settings` and enable developer mode
3. Create Connector:
   - Go to `Apps & Connectors` and click `Create`
   - Enter a name for your connector
   - Enter your MCP server URL
   - Select `No Authentication` (or configure auth if needed)
   - Accept the terms and conditions
   - Click `Create`
4. Create a new chat and use the `/` command to access the connector
5. Try: "Analyze this Amazon product: https://www.amazon.in/iPhone-Pro-Max-512-Promotion/dp/B0FQG8XCJ1?ref_=ast_sto_dp"

## Troubleshooting

### Products not analyzing

- Check your `BRIGHTDATA_API_KEY` is set correctly
- Verify the Amazon URL contains valid full URL of the product page
- Ensure your Bright Data account has credits
- Check browser console for errors

### Images not loading

- Images are proxied through `/api/image-proxy` to bypass CORS
- Check that the image proxy endpoint is accessible

### Widget not displaying

- Verify server is running (`npm run dev`)
- Check that widget is built (`npm run build`)
- Ensure `widgetMetadata` is exported
- Check browser console for errors

## Learn More

- [mcp-use Documentation](https://docs.mcp-use.com)
- [Bright Data Documentation](https://docs.brightdata.com)
- [OpenAI Apps SDK](https://platform.openai.com/docs/apps)
- [MCP Protocol](https://modelcontextprotocol.io)

## 📬 Stay Updated with Our Newsletter!

**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

## Contribution
