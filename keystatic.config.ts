import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'steftest82-jpg',
      name: 'crypto-pointers',
    },
  },
  ui: {
    brand: {
      name: 'Crypto Pointers',
    },
    navigation: {
      Content: ['posts'],
      Settings: ['siteSettings'],
    },
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            description: 'The headline of the blog post. This also generates the URL slug.',
            validation: { isRequired: true },
          },
        }),
        publishedAt: fields.date({
          label: 'Published Date',
          description: 'The date this post was published. Used for sorting and display.',
          validation: { isRequired: true },
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          description: 'A compelling summary of the post (150-160 characters ideal). Used in meta descriptions, social cards, and post previews.',
          multiline: true,
          validation: { isRequired: true },
        }),
        coverImage: fields.text({
          label: 'Cover Image URL',
          description: 'Full URL to the cover image (1200x630 recommended for optimal social sharing). Supports remote URLs from configured image domains.',
          validation: { isRequired: true },
        }),
        author: fields.text({
          label: 'Author',
          description: 'Full name of the post author.',
          defaultValue: 'Yosef Kamel',
          validation: { isRequired: true },
        }),
        focusKeyword: fields.text({
          label: 'Focus Keyword',
          description: 'The primary SEO keyword this post targets. Used in meta tags and structured data. Choose a keyword with search volume and relevance.',
          validation: { isRequired: false },
        }),
        categories: fields.multiselect({
          label: 'Categories',
          description: 'Select one or more categories for this post. These determine which category pages the post appears on.',
          options: [
            { label: 'Crypto News', value: 'Crypto News' },
            { label: 'Crypto Guides', value: 'Crypto Guides' },
            { label: 'Crypto Investing', value: 'Crypto Investing' },
            { label: 'Crypto Reviews', value: 'Crypto Reviews' },
          ],
        }),
        tableOfContents: fields.array(
          fields.object({
            heading: fields.text({
              label: 'Heading Text',
              description: 'The heading text exactly as it appears in the article body.',
              validation: { isRequired: true },
            }),
            anchor: fields.text({
              label: 'Anchor ID',
              description: 'The HTML id attribute for this heading (lowercase, hyphens, no spaces). Must match the id on the corresponding h2/h3 element in the content.',
              validation: { isRequired: true },
            }),
          }),
          {
            label: 'Table of Contents',
            description: 'Define the headings that appear in the sidebar table of contents. Each entry needs the heading text and its corresponding anchor ID from the article body.',
            itemLabel: (props) => props.fields.heading.value || 'New Section',
          }
        ),
        keyTakeaways: fields.array(
          fields.text({
            label: 'Takeaway',
            description: 'A single key takeaway point. Write clear, actionable insights that readers can immediately understand and apply.',
            validation: { isRequired: true },
          }),
          {
            label: 'Key Takeaways',
            description: 'The most important points from this article, displayed prominently at the top of the post. Aim for 3-6 takeaways per article.',
            itemLabel: (props) => props.value || 'New Takeaway',
          }
        ),
        content: fields.mdx({
          label: 'Content',
          description: 'The full article body. Use h2 elements with id attributes that match your Table of Contents anchors. Write in a bold, authoritative, and educational tone.',
          options: {
            bold: true,
            italic: true,
            strikethrough: true,
            code: true,
            heading: [2, 3, 4],
            blockquote: true,
            orderedList: true,
            unorderedList: true,
            table: true,
            link: true,
            image: true,
            divider: true,
            codeBlock: true,
          },
        }),
      },
    }),
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'content/settings/',
      format: 'yaml',
      schema: {
        siteName: fields.text({
          label: 'Site Name',
          description: 'The name of the website displayed in the header, footer, and meta tags.',
          defaultValue: 'Crypto Pointers',
          validation: { isRequired: true },
        }),
        siteTagline: fields.text({
          label: 'Site Tagline',
          description: 'A short tagline displayed beneath the site name and in meta descriptions.',
          defaultValue: 'Your Trusted Source of Crypto Information',
          validation: { isRequired: true },
        }),
        siteDescription: fields.text({
          label: 'Site Description',
          description: 'The default meta description for the homepage and fallback for pages without custom descriptions (150-160 characters ideal).',
          multiline: true,
          defaultValue: 'Crypto Pointers is the bold crypto magazine for investors who demand more than hype. Get no-nonsense market analysis, investing guides, honest reviews, and breaking crypto news — all designed to help you navigate the digital economy with confidence.',
          validation: { isRequired: true },
        }),
        siteUrl: fields.url({
          label: 'Site URL',
          description: 'The canonical production URL of the website. Used for sitemap generation, Open Graph tags, RSS feeds, and canonical URLs.',
          defaultValue: 'https://cryptopointers.com',
          validation: { isRequired: true },
        }),
        authorName: fields.text({
          label: 'Default Author Name',
          description: 'The default author name used when no specific author is set on a post.',
          defaultValue: 'Yosef Kamel',
          validation: { isRequired: true },
        }),
        authorTitle: fields.text({
          label: 'Author Title',
          description: 'The professional title displayed alongside the author name.',
          defaultValue: 'Lead Author & Crypto Analyst',
          validation: { isRequired: true },
        }),
        authorBio: fields.text({
          label: 'Author Bio',
          description: 'A biographical paragraph about the lead author, displayed on the About page and author cards throughout the site.',
          multiline: true,
          defaultValue: 'Yosef Kamel is a seasoned crypto analyst and the founding voice behind Crypto Pointers. With deep roots in blockchain technology and decentralised finance, Yosef cuts through the noise to deliver bold, evidence-based insights that help readers navigate the fast-moving world of cryptocurrency. His mission: empower every investor — from curious beginner to battle-tested trader — with the knowledge to make confident, informed decisions in the digital economy.',
          validation: { isRequired: true },
        }),
        authorImage: fields.text({
          label: 'Author Image URL',
          description: 'Full URL to the author headshot image. Used on author cards, the About page, and within blog posts.',
          defaultValue: 'http://img.b2bpic.net/premium-photo/person-business-businesswoman-woman-adult-female-smiling-portrait-office-horizontal-photog_1064589-402141.jpg',
        }),
        socialTwitter: fields.text({
          label: 'Twitter / X Handle',
          description: 'Your Twitter/X handle without the @ symbol. Used for Twitter Card meta tags and social links.',
          defaultValue: '',
        }),
        socialYoutube: fields.url({
          label: 'YouTube Channel URL',
          description: 'Full URL to the YouTube channel. Displayed in the footer social links.',
          defaultValue: 'https://youtube.com',
        }),
        socialLinkedin: fields.url({
          label: 'LinkedIn Profile URL',
          description: 'Full URL to the LinkedIn profile or company page. Displayed in the footer social links.',
          defaultValue: 'https://linkedin.com',
        }),
        socialTelegram: fields.url({
          label: 'Telegram Channel URL',
          description: 'Full URL to the Telegram channel or group. Displayed in the footer social links.',
          defaultValue: 'https://t.me',
        }),
        newsletterHeadline: fields.text({
          label: 'Newsletter Headline',
          description: 'The main heading displayed on the newsletter signup section.',
          defaultValue: 'Get the Alpha. Skip the Noise.',
          validation: { isRequired: true },
        }),
        newsletterDescription: fields.text({
          label: 'Newsletter Description',
          description: 'The supporting text beneath the newsletter headline.',
          multiline: true,
          defaultValue: 'Join thousands of crypto-curious investors who get our top picks, market breakdowns, and actionable strategies delivered straight to their inbox. Free. No spam. Ever.',
          validation: { isRequired: true },
        }),
        footerDisclaimer: fields.text({
          label: 'Footer Disclaimer',
          description: 'Legal disclaimer text displayed at the bottom of every page.',
          defaultValue: 'Educational content only. Not financial advice. Always do your own research.',
          validation: { isRequired: true },
        }),
        postsPerPage: fields.integer({
          label: 'Posts Per Page',
          description: 'The number of blog posts to display per page on listing pages.',
          defaultValue: 12,
          validation: { isRequired: true, min: 3, max: 50 },
        }),
        enableNewsletter: fields.checkbox({
          label: 'Enable Newsletter Signup',
          description: 'Show or hide the newsletter signup sections across the site.',
          defaultValue: true,
        }),
        enableRssFeed: fields.checkbox({
          label: 'Enable RSS Feed',
          description: 'Enable or disable the /api/feed RSS endpoint.',
          defaultValue: true,
        }),
        enableSearchBar: fields.checkbox({
          label: 'Enable Search Bar',
          description: 'Show or hide the search bar in the site header.',
          defaultValue: true,
        }),
        googleAnalyticsId: fields.text({
          label: 'Google Analytics ID',
          description: 'Your Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX). Leave empty to disable analytics tracking.',
          defaultValue: '',
        }),
      },
    }),
  },
});
