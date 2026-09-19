export const GITHUB_OWNER = "AdityaSeth777";
export const GITHUB_REPO = "SA-Ex";
export const GITHUB_BRANCH = "main";

export function githubSourceUrl(sourcePath: string): string {
  return `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/blob/${GITHUB_BRANCH}/${sourcePath}`;
}

export function githubRepoUrl(): string {
  return `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;
}
