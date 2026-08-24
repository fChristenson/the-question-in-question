class SearchController {
  public static Search(
    query: string,
    commands: Record<string, string>,
  ): string[] {
    const tokens = getQueryTokens(query);
    return findMatches(tokens, commands);
  }
}
