import { asset } from "@/lib/asset";

type Props = {
  /** Nome base em public/imagens/otimizadas, ex.: "prova-1m-vendas" */
  nome: string;
  larguras: number[];
  sizes: string;
  alt: string;
  width: number;
  height: number;
  prioridade?: boolean;
  className?: string;
  imgClassName?: string;
};

/** Imagem responsiva com AVIF e WebP pré-gerados (scripts/otimizar-imagens.mjs). */
export function Picture({ nome, larguras, sizes, alt, width, height, prioridade, className, imgClassName }: Props) {
  const src = (fmt: string) => larguras.map((w) => `${asset(`/imagens/otimizadas/${nome}-${w}.${fmt}`)} ${w}w`).join(", ");
  const maior = larguras[larguras.length - 1];
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={src("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={src("webp")} sizes={sizes} />
      <img
        src={asset(`/imagens/otimizadas/${nome}-${maior}.webp`)}
        alt={alt}
        width={width}
        height={height}
        loading={prioridade ? "eager" : "lazy"}
        fetchPriority={prioridade ? "high" : "auto"}
        decoding={prioridade ? "sync" : "async"}
        className={imgClassName}
      />
    </picture>
  );
}

export function Logo({ variante = "escuro", className }: { variante?: "escuro" | "claro"; className?: string }) {
  const nome = variante === "escuro" ? "logo" : "logo-branco";
  const [w, h] = variante === "escuro" ? [480, 144] : [480, 139];
  return (
    <Picture
      nome={nome}
      larguras={[240, 480]}
      sizes="180px"
      alt="Next Step"
      width={w}
      height={h}
      prioridade={variante === "escuro"}
      imgClassName={className}
    />
  );
}
