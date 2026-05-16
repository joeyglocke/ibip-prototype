export const agentLogos = {
  jira: (size = 12) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
      <path d="M12.004 0c-2.35 2.395-2.365 6.185.133 8.585l3.412 3.413-3.197 3.198a6.501 6.501 0 0 1 1.412 7.04l9.566-9.566a.95.95 0 0 0 0-1.344L12.004 0z"/>
      <path d="m10.256 1.74L.67 11.327a.95.95 0 0 0 0 1.344C4.45 16.44 8.22 20.244 12 24c2.295-2.298 2.395-6.096-.08-8.533l-3.47-3.469 3.2-3.2c-1.918-1.955-2.363-4.725-1.394-7.057z"/>
    </svg>
  ),
  claude: (size = 12) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
      <path d="M17.3041 3.541h-3.6718l6.696 16.918H24z"/>
      <path d="M10.5363 3.5409L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456z"/>
    </svg>
  ),
  // IBIP — Install Base Intelligence Platform. Mark glyph reads as a stylized
  // "i" sitting inside a shielded badge: vertical preservation + protective
  // surround, the two promises of the platform.
  ibip: (size = 12) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 1.5 3 5v6.2c0 5.1 3.6 9.4 9 11.3 5.4-1.9 9-6.2 9-11.3V5l-9-3.5z"
        fill="#fff"
        opacity="0.18"
      />
      <path
        d="M12 1.5 3 5v6.2c0 5.1 3.6 9.4 9 11.3 5.4-1.9 9-6.2 9-11.3V5l-9-3.5z"
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="7.6" r="1.25" fill="#fff" />
      <rect x="10.85" y="10.2" width="2.3" height="7.1" rx="0.6" fill="#fff" />
    </svg>
  ),
}
