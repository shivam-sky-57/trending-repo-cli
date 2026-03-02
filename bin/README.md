# 🚀 GitHub Trending CLI

A simple Node.js CLI tool that fetches trending GitHub repositories based on creation date and sorts them by stars.

---

## 📦 Features

- Filter repositories by time range:
  - `day`
  - `week`
  - `month`
  - `year`
- Limit number of repositories displayed
- Input validation with clear error messages
- Uses GitHub Search API
- Clean and readable terminal output

---

## 🛠 Installation

### 1️⃣ Clone the repository

```bash
git clone <your-repository-url>
cd github-cli
```

### 2️⃣ Install dependencies

```bash
npm install
```

---

## 🔗 Link Globally (Run as CLI Command)

To use the CLI globally:

```bash
npm link
```

Now you can run:

```bash
trend --duration week --limit 10
```

---

## ⚙ Usage

```
trend [options]
```

### Options

| Option | Description | Default |
|--------|------------|----------|
| `--duration <time>` | Time range (`day`, `week`, `month`, `year`) | `week` |
| `--limit <number>` | Number of repositories (1–100) | `10` |

---

## 🧪 Examples

### Get top 5 repositories created this week

```bash
trend --duration week --limit 5
```

### Get repositories created in the last day

```bash
trend --duration day
```

### Get top 20 repositories created this month

```bash
trend --duration month --limit 20
```

---

## 📡 How It Works

1. Calculates a date based on the selected duration.
2. Calls GitHub Search API:
   ```
   https://api.github.com/search/repositories
   ```
3. Filters repositories created after the calculated date.
4. Sorts results by star count (descending).
5. Displays:
   - Repository name
   - Description
   - Stars
   - Language
   - URL

---

## ⚠ Rate Limiting

Unauthenticated GitHub API requests are limited to:

- **60 requests per hour per IP**

If you exceed this limit, GitHub will reject requests.

For production use, consider adding support for a GitHub Personal Access Token.

---
