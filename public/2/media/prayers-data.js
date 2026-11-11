/**
 * Coleção Sagrada de Orações do Arcanjo Miguel & Santuário da Fé
 * Tier $27: 20 Orações
 * Tier $47: 40 Orações
 * Tier $77: 60 Orações
 * Tier $100: 80 Orações
 */
(function(window) {
  var PRAYERS = [
    // TIER 1 ($27) - 20 ORAÇÕES: Despertar Divino, Proteção e Quebra de Escassez
    {
      id: 1,
      title: "Oração pela Proteção e Escudo do Arcanjo Miguel",
      verse: "Salmo 91:11 — 'Porque aos seus anjos dará ordem a teu respeito, para te guardarem em todos os teus caminhos.'",
      body: "Glorioso Arcanjo Miguel, príncipe dos exércitos celestiais, cerca a minha vida, a minha casa e as minhas finanças com a tua espada de fogo e luz divina. Corta todo laço de escassez, todo impedimento espiritual e toda energia de retrocesso. Que sob a proteção do Altíssimo eu caminhe com passos firmes, sabendo que nenhuma praga chegará à minha tenda. Em nome do Pai, do Filho e do Espírito Santo. Amém."
    },
    {
      id: 2,
      title: "Oração pela Quebra de Toda Escassez e Falta",
      verse: "Filipenses 4:19 — 'O meu Deus suprirá todas as vossas necessidades segundo as suas gloriosas riquezas em Cristo Jesus.'",
      body: "Senhor Deus Todo-Poderoso, hoje eu renuncio a todo sentimento de carência e medo de faltar. Rompo com palavras de derrota que foram lançadas sobre mim ou sobre meus antepassados. Declaro que o manancial da Tua abundância está aberto sobre a minha vida. Entram recursos, saem dívidas; entra fartura, sai aperto. Minha despensa e minha conta serão testemunhas da Tua provisão. Amém."
    },
    {
      id: 3,
      title: "Oração para Abertura das Janelas dos Céus",
      verse: "Malaquias 3:10 — '...e vede se eu não vos abrir as janelas do céu e não derramar sobre vós uma bênção tal, que dela vos advenha a maior abastança.'",
      body: "Pai celestial, coloco diante do Teu altar a minha vida, meu trabalho e as minhas sementes de fé. Abre sobre mim os céus que estavam trancados. Que chova favor, oportunidades milagrosas e contatos abençoados. Repreende todo devorador e faz germinar cada esforço do meu trabalho cem vezes mais. Eu recebo e agradeço a abundância que já se manifesta. Amém."
    },
    {
      id: 4,
      title: "Oração da Manhã pelo Favor Divino",
      verse: "Salmo 5:3 — 'Pela manhã, Senhor, ouves a minha voz; pela manhã te apresento a minha oração e fico esperando.'",
      body: "Ao nascer deste dia, entrego cada passo nas Tuas mãos, Senhor. Que onde eu colocar a planta dos meus pés, haja bênção e prosperidade. Que as pessoas certas cruzem o meu caminho e que portas de prosperidade se abram antes mesmo que eu bata. Arcanjo Miguel, guia minhas decisões e afasta toda armadilha oculta. Amém."
    },
    {
      id: 5,
      title: "Oração para Vencer o Medo e a Incerteza",
      verse: "Josué 1:9 — 'Não fui eu que lhe ordenei? Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.'",
      body: "Deus de vitória, dissipa do meu peito qualquer ansiedade sobre o futuro. O medo da escassez não tem mais domínio sobre a minha mente. Tu és o meu pastor e nada me faltará. Ergo a cabeça com a coragem dos guerreiros da fé, pronto para colher os frutos que tens reservado para os Teus filhos. Amém."
    },
    {
      id: 6,
      title: "Oração da Multiplicação de Recursos",
      verse: "Mateus 14:19 — 'Tomando os cinco pães e os dois peixes e, olhando para o céu, deu graças e os partiu... e todos comeram e ficaram fartos.'",
      body: "Senhor Jesus, assim como multiplicaste pães e peixes no deserto, multiplica cada centavo que entra na minha vida. Que o pouco em minhas mãos se torne muito sob a Tua bênção. Dá-me sabedoria para gerir, multiplicar e transbordar na vida dos que me cercam. Amém."
    },
    {
      id: 7,
      title: "Oração pela Paz no Lar e Família Abençoada",
      verse: "Salmo 128:3 — 'A tua mulher será como a videira frutífera aos lados da tua casa; os teus filhos como plantas de oliveira à roda da tua mesa.'",
      body: "Senhor, derrama a Tua paz bendita sobre o meu lar. Que as brigas por dinheiro, as tensões e os desentendimentos cessem agora. Estabelece a harmonia, o amor e o respeito sob o meu teto. Guarda a mente e o coração de cada familiar sob a proteção dos Teus anjos. Amém."
    },
    {
      id: 8,
      title: "Oração para Destravar Portas Profissionais e Negócios",
      verse: "Apocalipse 3:8 — 'Conheço as tuas obras; eis que pus diante de ti uma porta aberta, que ninguém pode fechar.'",
      body: "Pai bendito,Tu que abres portas que homem nenhum pode fechar: destrava agora as minhas vendas, meus projetos e minhas propostas. Que todo bloqueio burocrático, inveja ou impedimento caia por terra. Onde havia estagnação, agora corre o rio do progresso e do lucro honesto. Amém."
    },
    {
      id: 9,
      title: "Oração de Sabedoria nas Decisões Financeiras",
      verse: "Tiago 1:5 — 'Se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá generosamente e sem censuras.'",
      body: "Espírito Santo de Deus, concede-me discernimento e clareza divina. Guarda-me de maus negócios, gastos impulsivos e ciladas financeiras. Que meus olhos vejam as oportunidades verdadeiras e que minhas mãos trabalhem com prudência e visão de futuro. Amém."
    },
    {
      id: 10,
      title: "Oração para Repreender o Espírito de Derrota",
      verse: "Romanos 8:37 — 'Mas em todas estas coisas somos mais do que vencedores, por aquele que nos amou.'",
      body: "Pelo poder supremo do Sangue de Cristo e pela intercessão do Arcanjo Miguel, ordeno que todo espírito de derrota, cansaço e frustração se retire agora da minha vida. Sou herdeiro das promessas divinas. A vitória já foi decretada nos céus e se cumpre na Terra. Amém."
    },
    {
      id: 11,
      title: "Oração pela Saúde e Energia do Corpo e Espírito",
      verse: "Jeremias 30:17 — 'Porque te restaurarei a saúde, e te curarei as tuas feridas, diz o Senhor.'",
      body: "Senhor Deus, fonte de toda vida e vigor: renova as minhas forças físicas, mentais e espirituais. Que meu corpo seja templo de vitalidade para que eu possa desfrutar plenamente de cada bênção material e espiritual que tens derramado sobre mim. Amém."
    },
    {
      id: 12,
      title: "Oração do Pagamento de Dívidas e Libertação",
      verse: "Salmo 37:21 — 'O ímpio toma emprestado e não paga; mas o justo se compadece e dá.'",
      body: "Pai misericordioso, coloco em Tuas mãos cada compromisso financeiro pendente. Abre as fontes de suprimento para que eu liquide cada dívida com rapidez e honra. Liberta-me de qualquer jugo de cobrança e estabelece uma nova história de liberdade financeira em minha vida. Amém."
    },
    {
      id: 13,
      title: "Oração de Gratidão pelas Bênçãos que se Aproximam",
      verse: "1 Tessalonicenses 5:18 — 'Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.'",
      body: "Senhor, antes mesmo de ver com os olhos materiais, eu Te agradeço pela bênção que já está a caminho. Agradeço pelo livramento, pelo pão, pelo teto e pelas vitórias que Tu já desenhaste para mim. O meu coração transborda em louvor e certeza. Amém."
    },
    {
      id: 14,
      title: "Oração pelo Desatar dos Nós Financeiros",
      verse: "Lucas 1:37 — 'Porque para Deus nada é impossível.'",
      body: "Arcanjo Miguel, com a Tua espada reluzente, corta e desata todo nó que amarrava o meu dinheiro, minha aposentadoria, minhas comissões e meus processos. O que estava emperrado entra em movimento agora. O poder de Deus destrava tudo o que estava travado. Amém."
    },
    {
      id: 15,
      title: "Oração da Espada de Miguel contra Toda Inveja",
      verse: "Salmo 35:1 — 'Pleiteia, Senhor, com aqueles que pleiteiam comigo; peleja contra os que pelejam contra mim.'",
      body: "Arcanjo Miguel, defende-me dos olhos invejosos, da cobiça e dos pensamentos negativos alheios. Que qualquer maldição dita contra mim se transforme em bênção multiplicada. O escudo da fé cobre a mim e a tudo o que me pertence. Amém."
    },
    {
      id: 16,
      title: "Oração da Aliança com a Prosperidade Divina",
      verse: "Deuteronômio 8:18 — 'Antes te lembrarás do Senhor teu Deus, que ele é o que te dá força para adquirires riquezas.'",
      body: "Deus eterno, reconheço que toda força e capacidade vêm de Ti. Firmo hoje uma aliança de retidão, generosidade e gratidão. Que a minha prosperidade seja farol para abençoar vidas e glorificar o Teu Santo Nome por onde eu passar. Amém."
    },
    {
      id: 17,
      title: "Oração do Descanso na Providência de Deus",
      verse: "Salmo 23:1 — 'O Senhor é o meu pastor, nada me faltará.'",
      body: "Nesta noite e em todos os dias, descanso o meu coração. Entrego minhas preocupações a Ti, sabendo que enquanto durmo, o Senhor trabalha em meu favor. Acordo renovado, seguro de que a Tua providência nunca falha. Amém."
    },
    {
      id: 18,
      title: "Oração pela Unção e Prosperidade do Trabalho",
      verse: "Salmo 90:17 — 'Confirma sobre nós as obras das nossas mãos; sim, confirma a obra das nossas mãos.'",
      body: "Senhor Deus, abençoa as minhas mãos e a minha mente no trabalho que exerço. Que haja excelência, criatividade e produtividade fora do comum. Que meus clientes e superiores reconheçam a Tua mão sobre a minha vida, gerando crescimento contínuo. Amém."
    },
    {
      id: 19,
      title: "Oração de Reconexão com o Propósito de Vida",
      verse: "Jeremias 29:11 — 'Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de causar dano.'",
      body: "Pai Amado, alinha os meus desejos com a Tua vontade perfeita. Mostra-me com clareza o caminho para o qual fui chamado. Que a minha vida seja repleta de significado, prosperidade e paz verdadeira. Amém."
    },
    {
      id: 20,
      title: "Oração da Selagem Divina e Vitória Diária",
      verse: "Efésios 6:11 — 'Revesti-vos de toda a armadura de Deus, para que possais estar firmes contra as astutas ciladas do diabo.'",
      body: "Selo hoje todas as orações e decretos com o sangue precioso do Cordeiro e com o testemunho dos santos anjos. Minha vida financeira, familiar e espiritual está blindada. Nenhuma arma forjada contra mim prevalecerá. Eu sou vencedor em Cristo Jesus. Amém!"
    },

    // TIER 2 ($47) - ORAÇÕES 21 A 40: Multiplicação Acelerada e Rompimento de Barreiras
    {
      id: 21,
      title: "Oração do Rompimento de Barreiras Geracionais",
      verse: "Êxodo 20:6 — 'E faço misericórdia até mil gerações daqueles que me amam e guardam os meus mandamentos.'",
      body: "Senhor, quebro agora toda maldição de pobreza, falência ou sofrimento que tenha operado na história da minha família. Eu inauguro um ciclo de bênção, riqueza com propósito e honra que alcançará os meus filhos e netos até mil gerações. Amém."
    },
    {
      id: 22,
      title: "Oração pela Restituição do que foi Perdido",
      verse: "Joel 2:25 — 'Restituir-vos-ei os anos que foram consumidos pelo gafanhoto, a locusta e o pulgão...'",
      body: "Deus da restituição, clamo pelo retorno de tudo aquilo que o inimigo, os erros do passado ou a injustiça me tiraram. Que haja devolução multiplicada de tempo, recursos, saúde e paz. O Teu favor restaura o meu patrimônio agora. Amém."
    },
    {
      id: 23,
      title: "Oração do Ímã da Abundância Espiritual",
      verse: "Provérbios 10:22 — 'A bênção do Senhor enriquece, e ele não acrescenta dores.'",
      body: "Declaro que a minha mente e a minha vida são atraentes para a riqueza bendita de Deus, aquela que constrói sem trazer dor. Afasto pensamentos mesquinhos e abro os braços para a abundância no Reino. Amém."
    },
    {
      id: 24,
      title: "Oração pelos Anjos da Providência ao Redor da Casa",
      verse: "Salmo 34:7 — 'O anjo do Senhor acampa-se ao redor dos que o temem, e os livra.'",
      body: "Arcanjo Miguel e hostes celestes, montem guarda nas quatro portas da minha casa. Que nenhum espírito de desespero, escassez ou discórdia encontre brecha. Onde há anjos de Deus, há fartura e proteção constante. Amém."
    },
    {
      id: 25,
      title: "Oração para Atrair Oportunidades Divinas",
      verse: "Salmo 1:3 — 'Pois será como a árvore plantada junto a ribeiros de águas... e tudo quanto fizer prosperará.'",
      body: "Senhor, sintoniza o meu espírito com as grandes oportunidades preparadas antes da fundação do mundo. Que eu esteja no lugar certo, na hora certa, falando as palavras certas para prosperar com integridade e poder. Amém."
    },
    {
      id: 26,
      title: "Oração da Firmeza Diante das Adversidades",
      verse: "Isaías 41:10 — 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo...'",
      body: "Ainda que as tempestades soprem forte e as notícias do mundo sejam incertas, meu alicerce é o Criador dos Céus e da Terra. Minha casa está firmada sobre a Rocha. Nenhuma crise econômica abalará o plano de Deus para mim. Amém."
    },
    {
      id: 27,
      title: "Oração da Colheita Farta e Inesperada",
      verse: "Gálatas 6:9 — 'E não nos cansemos de fazer o bem, porque a seu tempo ceifaremos, se não houvermos desfalecido.'",
      body: "Pai querido, cada lágrima derramada, cada oração feita no silêncio e cada sacrifício agora se transformam em sementes de colheita milagrosa. Chegou o meu tempo de colher com júbilo aquilo que plantei com perseverança. Amém."
    },
    {
      id: 28,
      title: "Oração pela Libertação da Mente de Pobreza",
      verse: "Romanos 12:2 — 'Transformai-vos pela renovação do vosso entendimento...'",
      body: "Arranco pela raiz todo pensamento de limitação, conformismo e medo do dinheiro. Assumo a mentalidade dos filhos do Rei dos Reis. Sou próspero para repartir, edificar e realizar grandes feitos em honra a Deus. Amém."
    },
    {
      id: 29,
      title: "Oração da Visão Limpa e Sonhos Proféticos",
      verse: "Provérbios 29:18 — 'Não havendo profecia, o povo se corrompe; mas o que guarda a lei, esse é bem-aventurado.'",
      body: "Espírito Santo, dá-me sonhos grandiosos e ideias inovadoras. Revela estratégias vencedoras para os meus negócios e minha vida pessoal. Minha visão alcança horizontes que antes pareciam impossíveis. Amém."
    },
    {
      id: 30,
      title: "Oração do Dobro da Honra no Lugar da Vergonha",
      verse: "Isaías 61:7 — 'Em lugar da vossa vergonha, tereis dupla honra; e em lugar da afronta, exultareis na vossa parte...'",
      body: "Deus da justiça, no lugar de cada humilhação ou desprezo que sofri no passado, Tu decretas dupla porção de honra e prosperidade. O mundo verá a Tua fidelidade brilhando sobre mim. Amém."
    },
    {
      id: 31,
      title: "Oração contra Inquietações e Ansiedades Noturnas",
      verse: "Filipenses 4:6 — 'Não andeis ansiosos de coisa alguma; em tudo, porém, sejam conhecidas diante de Deus as vossas petições...'",
      body: "Lançando fora todo fardo pesado, descanso em Ti. O sono reparador é meu direito divino. As noites de angústia ficaram para trás; o Senhor vela o meu sono e prepara vitórias para o meu amanhecer. Amém."
    },
    {
      id: 32,
      title: "Oração da Prosperidade dos Justos",
      verse: "Salmo 112:3 — 'Bens e riquezas haverá na sua casa, e a sua justiça permanece para sempre.'",
      body: "Senhor, prometeste que na casa do justo haverá bens e riquezas duradouras. Estabelece a solidez financeira na minha vida para que eu nunca dependa de favores de homens, mas viva do Teu manancial eterno. Amém."
    },
    {
      id: 33,
      title: "Oração para Destravar Processos e Valores Retidos",
      verse: "Salmo 146:7 — 'Que faz justiça aos oprimidos, que dá pão aos famintos. O Senhor solta os encarcerados.'",
      body: "Pelo poder supremo de Deus, todo processo, indenização, herança ou dinheiro que esteja injustamente retido é liberado agora. Que anjos ministradores toquem os corações dos juízes, gerentes e autoridades para acelerar a minha vitória. Amém."
    },
    {
      id: 34,
      title: "Oração do Fogo Purificador sobre Negócios",
      verse: "Malaquias 3:3 — 'E assentar-se-á, fundindo e purificando a prata... para que façam ofertas em justiça.'",
      body: "Que o fogo celestial queime todo engano, toda inveja e toda contaminação espiritual no meu ambiente profissional. Meus negócios são limpos, abençoados e protegidos pelas forças da luz. Amém."
    },
    {
      id: 35,
      title: "Oração de Blindagem dos Filhos e Gerações Futuras",
      verse: "Salmo 102:28 — 'Os filhos dos teus servos habitarão seguros, e a sua descendência ficará firme perante ti.'",
      body: "Arcanjo Miguel, estende tuas asas sobre meus filhos e entes queridos. Livra-os das más companhias, das drogas, do desespero e das ciladas mundanas. Que cresçam em sabedoria, graça e prosperidade contínua. Amém."
    },
    {
      id: 36,
      title: "Oração pela Multiplicação de 30, 60 e 100 Vezes Mais",
      verse: "Marcos 4:20 — 'E os que foram semeados em boa terra são os que ouvem a palavra e a recebem, e dão fruto, um a trinta, outro a sessenta, e outro a cem por um.'",
      body: "Minha vida é terra boa e fértil. Cada semente plantada em obediência rende cem vezes mais. Rejeito a colheita minguada; recebo o transbordar da glória de Deus na minha conta e na minha história. Amém."
    },
    {
      id: 37,
      title: "Oração para Encontrar Graça Diante de Pessoas-Chave",
      verse: "Neemias 1:11 — 'Faze prosperar hoje o teu servo, e dá-lhe graça perante este homem.'",
      body: "Pai celeste, derrama o Teu óleo de favor sobre mim. Que em reuniões, entrevistas e negociações eu encontre portas abertas e simpatia imediata nos corações daqueles que têm poder de decisão. Amém."
    },
    {
      id: 38,
      title: "Oração do Maná Cotidiano e Riquezas Eternas",
      verse: "Êxodo 16:4 — 'Eis que vos farei chover pão dos céus...'",
      body: "Assim como alimentaste Teu povo no deserto com o maná diário, nunca faltará o pão de cada dia nem a reserva para o futuro. Vivo na certeza de que a fonte divina é inesgotável. Amém."
    },
    {
      id: 39,
      title: "Oração para Calar Vozes de Dúvida e Acusação",
      verse: "Isaías 54:17 — 'Toda ferramenta preparada contra ti não prosperará; e toda língua que se levantar contra ti em juízo, tu a condenarás.'",
      body: "Em nome de Jesus, calo toda voz que diz que não vou conseguir, que nasci para sofrer ou que nada dará certo. A última palavra sobre a minha vida vem do Altíssimo, e Ele diz que sou mais que vencedor! Amém."
    },
    {
      id: 40,
      title: "Oração de Celebração pelo Novo Tempo Estabelecido",
      verse: "Eclesiastes 3:1 — 'Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu.'",
      body: "O tempo de choro e escassez acabou! Chegou o meu tempo de rir, de colher, de prosperar e de celebrar a fidelidade de Deus. Declaro inaugurado o período mais próspero e iluminado da minha história. Amém!"
    },

    // TIER 3 ($77) - ORAÇÕES 41 A 60: Segredos dos Arcanjos e Unção de Abundância
    {
      id: 41,
      title: "Oração do Manto Protetor do Arcanjo Miguel",
      verse: "Daniel 12:1 — 'E naquele tempo se levantará Miguel, o grande príncipe, que se põe pelos filhos do teu povo...'",
      body: "Glorioso Arcanjo Miguel, defensor dos justos, envolve-me com Teu manto de autoridade. Que nenhuma armadilha visível ou invisível consiga atingir meus bens, minha paz ou meu corpo. Sob a Tua liderança espiritual, eu venço cada batalha. Amém."
    },
    {
      id: 42,
      title: "Oração da Sabedoria de Salomão para Construir Riqueza",
      verse: "1 Reis 3:12 — 'Eis que te dei um coração tão sábio e entendido, que antes de ti teu igual não houve, e depois de ti teu igual não se levantará.'",
      body: "Deus eterno, assim como deste a Salomão sabedoria inigualável para administrar reinos e tesouros, concede-me inteligência financeira e discernimento estratégico. Que meus recursos se multipliquem em benefício da sociedade e da minha família. Amém."
    },
    {
      id: 43,
      title: "Oração pela Cura de Traumas Financeiros e Medos",
      verse: "Salmo 147:3 — 'Sara os quebrantados de coração, e lhes ata as suas feridas.'",
      body: "Senhor Jesus, cura as memórias de falências passadas, dívidas antigas e desilusões de pessoas que me passaram para trás. Arranca o trauma e devolve a confiança para ousar e vencer novamente. O passado não tem poder sobre o meu futuro. Amém."
    },
    {
      id: 44,
      title: "Oração para Ativação da Graça e Favor Imeritado",
      verse: "Gênesis 39:2 — 'E o Senhor estava com José, e foi homem próspero... e o Senhor fazia prosperar tudo o que ele fazia.'",
      body: "Que a unção de José esteja sobre mim. Mesmo nos lugares mais improváveis, serei promovido, reconhecido e abençoado. A graça de Deus atrai abundância e sucesso em cada empreendimento meu. Amém."
    },
    {
      id: 45,
      title: "Oração da Conquista da Casa e Moradia Abençoada",
      verse: "Isaías 32:18 — 'E o meu povo habitará em morada de paz, e em moradas bem seguras, e em lugares quietos de descanso.'",
      body: "Senhor, tomo posse da promessa da casa própria, do lar seguro, belo e espaçoso. Abre as condições financeiras, destrava o financiamento, envia o valor exato. Minha casa será refúgio de bênção e altar de oração. Amém."
    },
    {
      id: 46,
      title: "Oração pela Transição do Deserto para a Terra Prometida",
      verse: "Josué 5:12 — 'E cessou o maná no dia seguinte... e comeram dos frutos da terra de Canaã.'",
      body: "Declaro o fim da fase de deserto e sobrevivência. Entro hoje na terra que mana leite e mel, onde desfrutarei de casas que não edifiquei e vinhas que não plantei. Vivo a plenitude das promessas divinas. Amém."
    },
    {
      id: 47,
      title: "Oração pelo Rompimento de Ciclos de Prejuízo",
      verse: "2 Coríntios 9:8 — 'E Deus é poderoso para fazer abundar em vós toda a graça, a fim de que tendo sempre, em tudo, toda a suficiência, abundeis em toda a boa obra.'",
      body: "Quebro agora o padrão onde o dinheiro entra por uma porta e sai por outra. Todo ralo financeiro é fechado pelo poder da bênção de Deus. O que ganho é retido, aplicado com sabedoria e multiplicado exponencialmente. Amém."
    },
    {
      id: 48,
      title: "Oração do Azeite Inesgotável da Viúva",
      verse: "2 Reis 4:6 — 'E sucedeu que, cheias que foram as vasilhas, disse a seu filho: Chega-me ainda uma vasilha. Mas ele lhe disse: Não há mais vasilha alguma. Então o azeite parou.'",
      body: "Senhor, aumenta a minha capacidade de receber. Enquanto houver fé e vasilhas em minha vida, o Teu azeite de provisão não cessará. Há fluxo contínuo de recursos divinos jorrando sobre as minhas mãos. Amém."
    },
    {
      id: 49,
      title: "Oração para Atrair Clientes e Parceiros Fiéis",
      verse: "Provérbios 11:25 — 'A alma generosa prosperará, e o que regar também será regado.'",
      body: "Que os anjos da prosperidade conectem meu nome e meu trabalho a clientes honrados, pagadores pontuais e parceiros fiéis. Que cada relacionamento comercial seja baseado em verdade, justiça e lucro mútuo. Amém."
    },
    {
      id: 50,
      title: "Oração de Blindagem contra Golpes, Roubos e Perdas",
      verse: "Salmo 121:7 — 'O Senhor te guardará de todo o mal; guardará a tua alma.'",
      body: "Arcanjo Miguel, com tua vigilância angelical, blinda minhas contas bancárias, cartões, investimentos e bens contra qualquer fraude, furto ou engano de homens mal-intencionados. Meu patrimônio é sagrado e intocável. Amém."
    },
    {
      id: 51,
      title: "Oração da Herança e Longevidade Próspera",
      verse: "Provérbios 13:22 — 'O homem de bem deixa uma herança aos filhos de seus filhos...'",
      body: "Pai Amado, concede-me vida longa com saúde de ferro para construir um patrimônio sólido que abençoará não apenas a mim, mas meus filhos, netos e futuras gerações. Deixo um legado de integridade e riqueza abençoada. Amém."
    },
    {
      id: 52,
      title: "Oração do Coração Generoso e Sem Apego",
      verse: "Lucas 6:38 — 'Dai, e ser-vos-á dado; boa medida, recalcada, sacudida e transbordando vos deitarão no regaço...'",
      body: "Livra-me da avareza e do apego mesquinho. Que eu seja canal de bênção para estender a mão aos necessitados e apoiar a Tua obra. Sei que quem dá a Deus colhe com medidas transbordantes. Amém."
    },
    {
      id: 53,
      title: "Oração da Vitória sobre Golias Financeiros",
      verse: "1 Samuel 17:45 — 'Tu vens a mim com espada, e com lança, e com escudo; porém eu vou a ti em nome do Senhor dos Exércitos...'",
      body: "Diante de contas gigantes, processos assustadores ou dívidas que parecem intransponíveis: declaro que o Deus de Davi é o meu Deus! Com a pedra da fé e a palavra do Senhor, todo Golias financeiro tomba ao chão hoje! Amém."
    },
    {
      id: 54,
      title: "Oração da Luz que Dissipa Toda Escuridão na Mente",
      verse: "João 8:12 — 'Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida.'",
      body: "Dissipa toda névoa mental, depressão e desânimo. Que a luz de Cristo ilumine meus pensamentos para enxergar caminhos onde outros só veem paredes. Minha mente é clara, focada e criativa. Amém."
    },
    {
      id: 55,
      title: "Oração pelo Destravar da Criatividade e Novas Ideias",
      verse: "Êxodo 35:35 — 'Encheu-os de sabedoria do coração, para fazer toda a obra... e para inventar invenções.'",
      body: "Pai Celeste, sopra sobre mim o Teu Espírito de invenção e criatividade. Dá-me ideias inovadoras que resolvam problemas reais e gerem abundância financeira legítima para o meu sustento e de muitos. Amém."
    },
    {
      id: 56,
      title: "Oração da Conexão com os Anjos Mensageiros de Boas Notícias",
      verse: "Lucas 1:19 — 'Eu sou Gabriel, que assisto diante de Deus, e fui enviado a falar-te e dar-te estas alegres novas.'",
      body: "Senhor, envia Teus anjos mensageiros com boas notícias para o meu telefone, meu e-mail e minha porta. Chegam confirmações de aprovações, pagamentos recebidos e contratos fechados que alegrarão o meu coração. Amém."
    },
    {
      id: 57,
      title: "Oração da Fé que Move Montanhas",
      verse: "Marcos 11:23 — 'Se alguém disser a este monte: Ergue-te e lança-te no mar, e não duvidar no seu coração... assim lhe será feito.'",
      body: "Ordeno a todo monte de dificuldade: sai da minha frente agora! Minha fé está ancorada no Deus que faz do nada existir tudo. Não me curvo diante das montanhas; caminho sobre elas na autoridade de Jesus. Amém."
    },
    {
      id: 58,
      title: "Oração pela Paz Financeira que Excede o Entendimento",
      verse: "Filipenses 4:7 — 'E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus.'",
      body: "Recebo a paz sobrenatural que o mundo não pode dar nem tirar. Deito e durmo em paz, porque a minha estabilidade não vem da economia humana, mas do Deus Eterno que nunca dormita. Amém."
    },
    {
      id: 59,
      title: "Oração pelo Avivamento Espiritual no Lar",
      verse: "Atos 16:31 — 'Crê no Senhor Jesus Cristo e serás salvo, tu e a tua casa.'",
      body: "Derrama Teu Santo Espírito sobre cada membro da minha família. Que haja conversão, temor do Senhor, oração fervorosa e comunhão íntima sob o nosso teto. A bênção espiritual sustenta a bênção material. Amém."
    },
    {
      id: 60,
      title: "Oração da Consagração dos Frutos e da Primícia",
      verse: "Provérbios 3:9-10 — 'Honra ao Senhor com os teus bens, e com a primeira parte de todos os teus ganhos; e se encherão os teus celeiros...'",
      body: "Honro a Ti, Senhor, com tudo o que recebo. Coloco em primeiro lugar o Teu Reino e a Tua justiça, certo de que todas as outras coisas me são acrescentadas com fartura incomparável. Amém!"
    },

    // TIER 4 ($100) - ORAÇÕES 61 A 80: Manifestação Suprema 100x e Coroa da Vitória
    {
      id: 61,
      title: "Oração da Multiplicação Quântica 100x de Isaque",
      verse: "Gênesis 26:12 — 'E semeou Isaque naquela mesma terra, e colheu naquele mesmo ano cem medidas, porque o Senhor o abençoava.'",
      body: "Pai Amado, assim como Isaque semeou em terra árida e no mesmo ano colheu cem vezes mais por causa da Tua bênção, eu decreto o princípio da multiplicação 100x sobre cada investimento, semente e trabalho meu. Minha colheita quebra todas as regras naturais! Amém."
    },
    {
      id: 62,
      title: "Oração da Autoridade e Domínio Espiritual",
      verse: "Lucas 10:19 — 'Eis que vos dou poder para pisar serpentes e escorpiões, e toda a força do inimigo, e nada vos fará dano algum.'",
      body: "Levanto-me na autoridade do nome de Jesus e com o respaldo das hostes do Arcanjo Miguel. Repreendo todo demônio de ruína, de atraso e de míngua. Tomo posse do domínio que Deus me confiou sobre a terra e desfruto da plena vitória. Amém."
    },
    {
      id: 63,
      title: "Oração do Resgate de Terras, Contratos e Imóveis",
      verse: "Levítico 25:24 — 'Em toda a terra da vossa possessão dareis resgate à terra.'",
      body: "Deus Todo-Poderoso, reivindico o resgate de tudo aquilo que perdi ou que está travado em repartições e cartórios. Que as chaves da minha casa própria, terrenos e escrituras cheguem às minhas mãos com agilidade sobrenatural. Amém."
    },
    {
      id: 64,
      title: "Oração para Ativação do Poder da Palavra Declarada",
      verse: "Hebreus 11:3 — 'Pela fé entendemos que os mundos pela palavra de Deus foram criados; de maneira que aquilo que se vê não foi feito do que é aparente.'",
      body: "Minhas palavras têm poder de vida e não de morte. Não profetizo crise nem escassez. Declaro riqueza, saúde, portas escancaradas, contas pagas e paz inabalável. O que declaro na Terra é ligado nos Céus. Amém."
    },
    {
      id: 65,
      title: "Oração do Trono da Graça e Socorro em Tempo Certo",
      verse: "Hebreus 4:16 — 'Cheguemos, pois, com confiança ao trono da graça, para que possamos alcançar misericórdia e achar graça, a fim de sermos ajudados em tempo oportuno.'",
      body: "Entro com ousadia na presença do Pai celestial. Não sou mendigo espiritual, sou filho amado. Coloco diante de Ti as minhas urgências e recebo o socorro perfeito no momento exato. Tua pontualidade é impecável. Amém."
    },
    {
      id: 66,
      title: "Oração da Queda das Muralhas de Jericó nas Finanças",
      verse: "Josué 6:20 — 'Gritou, pois, o povo, tocando os sacerdotes as buzinas... e o muro caiu abaixo, e o povo subiu à cidade...'",
      body: "Pelo toque do louvor e pela força da minha fé, cai por terra toda muralha invisível que impedia o meu crescimento! Cai a muralha do desemprego, da inadimplência e do estresse. Eu tomo posse da cidade da bênção! Amém."
    },
    {
      id: 67,
      title: "Oração do Selo do Espírito Santo de Promessa",
      verse: "Efésios 1:13 — 'Em quem também vós estais, depois que ouvistes a palavra da verdade, o evangelho da vossa salvação... fostes selados com o Espírito Santo da promessa.'",
      body: "Trago em minha fronte e em minhas obras o selo real do Espírito Santo. Nenhuma potestade das trevas pode anular o que o Senhor escreveu a meu respeito. Sou propriedade exclusiva de Deus, predestinado para vencer. Amém."
    },
    {
      id: 68,
      title: "Oração da Riqueza com Propósito no Reino",
      verse: "1 Timóteo 6:18 — 'Que façam bem, enriqueçam em boas obras, repartam de boa mente, e sejam comunicáveis...'",
      body: "Senhor, dá-me riqueza abundante para que eu seja coluna de sustentação na vida dos necessitados, apoiador de causas santas e exemplo de generosidade. Minha prosperidade é ferramenta de amor e redenção. Amém."
    },
    {
      id: 69,
      title: "Oração para Desarmar Todo Ataque Oculto",
      verse: "Salmo 64:2 — 'Esconde-me do secreto conselho dos maus, e do tumulto dos que praticam a iniquidade.'",
      body: "Arcanjo Miguel, dissipa e confunde todo plano forjado nas trevas contra mim, meu casamento ou minha profissão. Que as armadilhas cavadas contra mim sirvam para encurralar o mal, enquanto eu sigo ileso sob as asas do Altíssimo. Amém."
    },
    {
      id: 70,
      title: "Oração da Vitória Judicial e Causa Ganha",
      verse: "Salmo 43:1 — 'Faze-me justiça, ó Deus, e pleiteia a minha causa contra uma nação ímpia. Livra-me do homem fraudulento e injusto.'",
      body: "Juiz Supremo de todo o Universo, assume a minha causa na corte celestial. Onde houver pendência jurídica ou disputa financeira, que a Tua justiça perfeita prevaleça em meu favor, trazendo sentença libertadora e rápida. Amém."
    },
    {
      id: 71,
      title: "Oração do Derramamento de Bênçãos sem Medida",
      verse: "Malaquias 3:10 — '...e não derramar sobre vós uma bênção tal, que dela vos advenha a maior abastança.'",
      body: "Abro o meu coração e a minha conta para o derramar do céu sem limites. Que as bênçãos me alcancem, me surpreendam e ultrapassem tudo o que pedi ou pensei, para que o nome de Deus seja glorificado em mim. Amém."
    },
    {
      id: 72,
      title: "Oração do Voo da Águia sobre as Tempestades",
      verse: "Isaías 40:31 — 'Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.'",
      body: "Enquanto outros se apavoram com os ventos contrários, eu utilizo a força do vento para subir mais alto. Tenho visão panorâmica, discernimento afiado e força inquebrantável dada pelo Espírito Santo. Amém."
    },
    {
      id: 73,
      title: "Oração da Honra Pública e Elevação de Posição",
      verse: "Salmo 75:6-7 — 'Porque nem do oriente, nem do ocidente, nem do deserto vem a exaltação. Mas Deus é o Juiz: a um abate, e a outro exalta.'",
      body: "Pai Eterno, é de Ti que vem a minha promoção. Não preciso forçar portas com bajulação humana, pois a Tua mão me ergue no tempo certo para lugares de honra, autoridade e liderança abençoada. Amém."
    },
    {
      id: 74,
      title: "Oração pela Purificação dos Sentimentos e Mágoas",
      verse: "Mateus 6:14 — 'Porque, se perdoardes aos homens as suas ofensas, também vosso Pai celestial vos perdoará a vós.'",
      body: "Libero perdão irrestrito a cada pessoa que me prejudicou, traiu ou caluniou. Não guardo mágoas, pois meu coração é templo de prosperidade e amor. Sou livre de qualquer raiz de amargura para receber o banquete de Deus. Amém."
    },
    {
      id: 75,
      title: "Oração do Banquete na Presença dos Adversários",
      verse: "Salmo 23:5 — 'Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.'",
      body: "Diante daqueles que duvidaram, que zombaram ou tentaram me derrubar, o Senhor estende uma mesa farta e transbordante. Unges a minha cabeça com azeite de alegria e fazes o meu cálice transbordar em bênçãos visíveis. Amém."
    },
    {
      id: 76,
      title: "Oração pelas Oportunidades e Conexões Globais",
      verse: "Salmo 2:8 — 'Pede-me, e te darei os gentios por herança, e os fins da terra por tua possessão.'",
      body: "Amplia as minhas tendas, Senhor! Que minhas ideias, produtos e serviços alcancem fronteiras além do que imaginei. Conecta-me a oportunidades grandiosas e mercados prósperos em todo lugar. Amém."
    },
    {
      id: 77,
      title: "Oração do Arcanjo Miguel pelo Triunfo Final",
      verse: "Apocalipse 12:11 — 'E eles o venceram pelo sangue do Cordeiro e pela palavra do seu testemunho...'",
      body: "Arcanjo Miguel, campeão celeste, proclamo junto contigo: QUEM COMO DEUS? NINGUÉM COMO DEUS! Toda batalha foi vencida, toda escuridão foi dissipada e a bandeira da vitória de Cristo está cravada na minha história para sempre. Amém."
    },
    {
      id: 78,
      title: "Oração da Estabilidade Inabalável sobre a Rocha",
      verse: "Mateus 7:24 — 'Todo aquele, pois, que escuta estas minhas palavras, e as pratica, assemelhá-lo-ei ao homem prudente, que edificou a sua casa sobre a rocha.'",
      body: "Minha vida, minhas finanças e minha família estão edificadas sobre a rocha eterna da Palavra de Deus. Desceu a chuva, transbordaram os rios, sopraram os ventos, mas a minha casa não caiu, porque está firmada em Ti! Amém."
    },
    {
      id: 79,
      title: "Oração do Jubileu: Cancelamento de Dívidas e Novo Começo",
      verse: "Levítico 25:10 — 'E santificareis o ano quinquagésimo, e apregoareis liberdade na terra a todos os seus moradores; ano de jubileu vos será...'",
      body: "Declaro o ano do meu Jubileu! Tempo de cancelamento de dívidas, de recuperação de tudo o que foi perdido, de reconciliação e de alívio total de cargas. Começo hoje um capítulo imaculado de abundância e júbilo celestial. Amém."
    },
    {
      id: 80,
      title: "Oração da Consagração Eterna e Bênção Apostólica",
      verse: "Números 6:24-26 — 'O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti, e tenha misericórdia de ti; o Senhor sobre ti levante o seu rosto e te dê a paz.'",
      body: "Recebo a coroa da vitória e a bênção eterna do Altíssimo. Que a graça de Jesus Cristo, o amor de Deus Pai e a comunhão doce do Espírito Santo estejam comigo hoje, amanhã e por todos os dias da minha vida. A vitória é minha, a glória é de Deus e o testemunho está selado para sempre. Amém, Amém e Amém!"
    }
  ];

  function getPrayersForTier(seedOrCount) {
    var count = 20;
    var n = parseInt(seedOrCount, 10);
    if (n === 47 || n === 40) count = 40;
    else if (n === 77 || n === 60) count = 60;
    else if (n === 100 || n === 80) count = 80;
    else if (n >= 80) count = 80;
    else if (n >= 60) count = 60;
    else if (n >= 40) count = 40;
    else count = 20;

    return PRAYERS.slice(0, count);
  }

  function getTierInfo(seedOrCount) {
    var count = 20;
    var n = parseInt(seedOrCount, 10);
    if (n === 47 || n === 40) count = 40;
    else if (n === 77 || n === 60) count = 60;
    else if (n === 100 || n === 80) count = 80;
    else if (n >= 80) count = 80;
    else if (n >= 60) count = 60;
    else if (n >= 40) count = 40;
    else count = 20;

    var titles = {
      20: "E-book das 20 Orações Sagradas do Arcanjo Miguel & Despertar Divino",
      40: "E-book das 40 Orações de Prosperidade, Restauração e Fé Inabalável",
      60: "E-book das 60 Orações de Abundância Suprema e Segredos dos Arcanjos",
      80: "E-book Supremo das 80 Orações de Manifestação 100x e Vitória Completa"
    };

    return {
      count: count,
      seed: (count === 80 ? "100" : (count === 60 ? "77" : (count === 40 ? "47" : "27"))),
      title: titles[count],
      prayers: PRAYERS.slice(0, count)
    };
  }

  window.FAITH_PRAYERS = PRAYERS;
  window.getPrayersForTier = getPrayersForTier;
  window.getTierInfo = getTierInfo;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      PRAYERS: PRAYERS,
      getPrayersForTier: getPrayersForTier,
      getTierInfo: getTierInfo
    };
  }
})(typeof window !== 'undefined' ? window : globalThis);
