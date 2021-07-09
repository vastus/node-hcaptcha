/**
 * The response type returned from the /siteverify
 * endpoint used for verifying the challenge token.
 */
type VerifyResponse = {
  /** Whether verification succeeded or not */
  success: boolean,

  /**
   * Timestamp of the captcha (ISO format yyyy-MM-dd'T'HH:mm:ssZZ).
   * Present when success is true.
   */
  challenge_ts?: string,

  /** Whether the response will be credited. Optional. */
  credit?: boolean,

  /** Hostname of the site where the captcha was solved. Optional */
  hostname?: string,

  /** List of error codes. Present if success is false */
  "error-codes"?: string[],
};

declare module "hcaptcha" {
  /**
   * Verify HCaptcha token validity.
   *
   * @param secret HCaptcha secret key (`0x...`)
   * @param token HCaptcha challenge token (`P0_ey...`)
   * @param remoteip Optional. The user's IP address.
   * @param sitekey Optional. The sitekey you expect to see.
   */
  export function verify(secret: string, token: string, remoteip?: string, sitekey?: string): Promise<VerifyResponse>;
}
