/**
 * Emits a JSON-LD graph. The payload is generated from typed site data, never
 * from user input, so serialising it into the script tag is safe; the `<`
 * escape guards against a stray sequence closing the tag early.
 */
export function JsonLd({ json }: { json: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, '\\u003c') }}
    />
  );
}
