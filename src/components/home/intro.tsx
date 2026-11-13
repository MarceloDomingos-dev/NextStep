/**
 * Entrada da home: sobre um fundo escuro, a escada laranja se desenha degrau a degrau,
 * subindo para a direita, e a tela sobe para revelar o site.
 *
 * - Toca uma vez por visita (sessionStorage). Ao voltar para a home, não repete.
 * - É só CSS: sem JavaScript, a animação roda e some sozinha.
 * - Com "reduzir movimento" ligado, não aparece.
 * A duração total fica em --intro (globals.css); o hero espera esse tempo para animar.
 */

const ESCADA = "M12 150 H 62 V 115 H 112 V 80 H 162 V 45 H 212 V 10";

const SCRIPT = `try{if(sessionStorage.getItem("ns-intro")){document.documentElement.setAttribute("data-intro","off")}else{sessionStorage.setItem("ns-intro","1")}}catch(e){}`;

export function Intro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
      <div className="intro" aria-hidden="true">
        <svg viewBox="0 0 224 160" className="intro-escada" focusable="false">
          <path d={ESCADA} pathLength={1} className="intro-traco" />
          <path d={ESCADA} pathLength={1} className="intro-ponta" />
        </svg>
      </div>
    </>
  );
}
