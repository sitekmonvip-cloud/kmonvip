// Server component — renders <script type="application/ld+json">
// Accepts one schema object or an array.

type Props = {
  data: object | object[];
};

export default function JsonLd({ data }: Props) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Stringify is intentional + safe (no user input here, all server-controlled)
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
