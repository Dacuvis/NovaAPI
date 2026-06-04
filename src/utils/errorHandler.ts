export class APPError extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message);
  }
}
