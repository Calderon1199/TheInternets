'use strict';

const { Post, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "Posts";
        return queryInterface.bulkInsert(options, [
            {
                title: 'Defessus aequus solium triumphus cenaculum vergo.',
                postText: 'Libero cotidie usque adhuc tenetur decet. Capitulus adopto possimus defero usque cometes officia validus quod. Spes claudeo ver magnam ver vehemens coniuratio. Expedita vindico laborum. Aveho eius uberrime cras acervus arbor numquam utrimque crinis verus.',
                userId: 2,
                categoryId: 3
            },
            {
                title: 'Abstergo bos charisma adhuc summopere acervus aurum reiciendis.',
                postText: 'Convoco decens abundans subito theologus despecto admiratio. Provident acquiro sonitus amo contego eveniet theologus vesco sum. Abeo umquam ustulo. Terreo deporto sodalitas corona vitiosus baiulus. Causa adiuvo cuius conservo terra tempore dolor capitulus.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Admiratio vae tepesco admoveo animi solitudo succedo.',
                postText: 'Ait atrocitas contigo conicio verus corrupti. Conscendo balbus carbo fugiat comedo. Antepono cresco eius coniecto architecto abbas aestivus turba incidunt. Defleo advenio textus delego urbs vulnero cuppedia. Timidus pecus dolores creber colo.',
                userId: 3,
                categoryId: 1
            },
            {
                title: 'Conscendo temporibus illum rerum turpis.',
                postText: 'Cribro verumtamen tristis sunt cognatus tibi tametsi cognatus sursum. Fugiat abeo tui. Atque laudantium aeneus comedo calco valetudo creber maxime debilito venustas. Tenuis valde anser tempora perspiciatis sopor comitatus accendo. Curia thesis tardus vae.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Cariosus statua convoco magni esse absum solio voluptatem.',
                postText: 'Calcar earum adsum. Conforto reiciendis aequus. Summisse cogito ulciscor sortitus consequuntur. Recusandae triduana dolorum neque. Paulatim urbanus aggero carbo sum.',
                userId: 3,
                categoryId: 1
            },
            {
                title: 'Apud coniecto calcar tendo denego facilis fugiat turba vacuus valde.',
                postText: 'Terga cunabula timidus animus calcar magni utpote cubicularis. Voluptatibus tabesco maxime tempora synagoga. Agnitio amet abundans sopor error tubineus occaecati spectaculum celo aggero. Tamdiu cenaculum caveo decerno valde natus corrumpo aliquam caste. Asporto degero veritas tempora tenus ventosus balbus crustulum.',
                userId: 2,
                categoryId: 3
            },
            {
                title: 'Ago acies sui.',
                postText: 'Thymum decimus custodia verbera defleo laudantium. Turba crur capio defessus illo contabesco attero curiositas culpa virtus. Absens titulus ulciscor confero tabgo caecus pauci vilicus audax. Pel depopulo deorsum sperno cursim aspernatur ait attonbitus. Confido vespillo tolero cur sufficio delectatio causa.',
                userId: 1,
                categoryId: 3
            },
            {
                title: 'Tendo conicio somnus corona accedo.',
                postText: 'Curia laborum deorsum reprehenderit delicate delicate paulatim corroboro. Averto colo auxilium arca capitulus amita certe alienus ventosus careo. Cariosus comparo conitor adiuvo. Cauda aperiam adsum antea debeo coaegresco ars. Crepusculum sufficio vicinus uterque debilito coadunatio ambitus somnus angulus.',
                userId: 1,
                categoryId: 2
            },
            {
                title: 'Vesper defungo sonitus.',
                postText: 'Facere aut advoco adulescens sit. Id bellicus adhaero cinis molestiae tristis. Vester strues qui credo succedo terra. Eius sumo denique cuppedia aeger considero umbra cuius minus. Eaque temporibus comptus thymbra sol denuo bardus.',
                userId: 3,
                categoryId: 1
            },
            {
                title: 'Molestiae tergum vallum coma angulus qui derelinquo ancilla.',
                postText: 'Aqua ut reprehenderit advenio commemoro totidem caute illum. Custodia terra fugiat velut delinquo valetudo derideo architecto. Ubi expedita territo sumptus cuius. Addo adamo temeritas clementia in textus coepi curia. Alienus deleo aegrotatio.',
                userId: 1,
                categoryId: 2
            },
            {
                title: 'Doloribus cernuus abbas coruscus apostolus solus.',
                postText: 'Ullus culpo theca currus celebrer corrupti carmen. Basium aliquid conscendo vilicus congregatio. Timidus agnitio angustus charisma caelestis summopere arcesso. Cruentus succurro creber audax totidem. Deprimo claudeo atrox textus arx voro cenaculum.',
                userId: 3,
                categoryId: 1
            },
            {
                title: 'Vesica ars cibo arguo appositus thema sortitus.',
                postText: 'Comminor cattus aperiam dignissimos conculco antepono synagoga inflammatio. Tondeo vigor versus vitium damno utrum desipio tabula arbitro reprehenderit. Casso derideo cruciamentum mollitia venustas. Aeternus thalassinus aspernatur vir acervus. Aufero calculus delicate viriliter corrigo.',
                userId: 3,
                categoryId: 3
            },
            {
                title: 'Combibo patior suppono substantia artificiose.',
                postText: 'Conforto adipisci vulpes testimonium consequatur urbs defaeco. Consectetur cervus eius suffragium decor deripio mollitia perspiciatis. Demonstro conservo summa defaeco vergo adeptio solitudo saepe. Teres vigilo verbum. Voluptas statim cado ars occaecati conscendo spectaculum universe deinde sufficio.',
                userId: 1,
                categoryId: 1
            },
            {
                title: 'Sui dapifer porro valens bene consuasor summisse vacuus sumptus.',
                postText: 'Coma confero infit eum acidus suppono. Vestrum studio adnuo. Vito curiositas canonicus. Aspicio ago sustineo acceptus alius bonus urbanus toties artificiose alo. Beneficium ademptio succurro tertius paulatim.',
                userId: 3,
                categoryId: 3
            },
            {
                title: 'Conforto vir eligendi.',
                postText: 'Supplanto compono unus quis. Hic tutis sui sed careo cui termes. Textor quod pecus depulso adinventitias. Alienus suspendo contra aegre antiquus deficio decretum. Culpo valens adversus supellex totus veritas paens umerus abeo.',
                userId: 2,
                categoryId: 1
            },
            {
                title: 'Debeo aegrotatio tremo creptio vulpes spes.',
                postText: 'Super bonus denuncio tergiversatio astrum decumbo omnis teres. Cupressus auditor advenio cado curvo praesentium laboriosam curia agnitio. Sol supellex aperiam tyrannus valde defungo. Aequus summopere cedo dolorem eos aestas succurro ancilla recusandae. Temptatio pecus pax.',
                userId: 1,
                categoryId: 3
            },
            {
                title: 'Astrum conor viduo capto.',
                postText: 'Velum repellendus modi. Stillicidium aegre illum magni cohibeo suppellex aspernatur. Recusandae stultus cito. Averto valeo adimpleo dolorum capio casso. Ater blandior uberrime abscido damnatio debeo unde vacuus adipisci cui.',
                userId: 3,
                categoryId: 1
            },
            {
                title: 'Articulus tametsi averto balbus consequatur.',
                postText: 'Tripudio certe quod audacia stillicidium clam. Vere supellex odit. Avarus nemo subvenio. Vinco arbitro degusto amiculum adhuc. Civitas sortitus aequitas causa valetudo vulpes corrigo.',
                userId: 3,
                categoryId: 1
            },
            {
                title: 'Vapulus cursus unus temptatio velum uterque enim angulus vinco.',
                postText: 'Facere cupiditate valetudo cubicularis. Quo tremo sequi conor vulnus congregatio adamo capillus. Coma conqueror deporto ante quasi desolo. Aliqua taedium adulescens ulterius. Amitto voluptate trado.',
                userId: 1,
                categoryId: 1
            },
            {
                title: 'Voluptas adsuesco natus bellum.',
                postText: 'Velut ullus accusamus dignissimos adulescens. In debilito campana vis voro laborum. Autem asper damnatio pax conicio audax verus. Utrum aliquam nemo tardus amor degusto sopor solium. Vos ambitus trepide aequitas quisquam ars quaerat porro adeptio.',
                userId: 1,
                categoryId: 3
            },
            {
                title: 'Fuga spectaculum bos vilicus textilis neque nulla architecto eveniet.',
                postText: 'Itaque clementia exercitationem absens qui cohaero vetus ante. Occaecati subiungo itaque apostolus animus corrigo fugit conservo optio thorax. Accedo adiuvo timor. Ocer vespillo sint dolorem angulus corrupti ratione crustulum pectus. Audentia tripudio teres sulum.',
                userId: 1,
                categoryId: 2
            },
            {
                title: 'Deporto adsuesco antea turpis colligo auditor.',
                postText: 'Voluptatibus colligo consequatur. Crebro demum rerum virgo ventito cervus tero tribuo. Cavus demonstro ventus talio baiulus amplitudo porro culpo vulticulus. Supplanto antiquus velum eaque adulescens statua exercitationem. Dolore adopto congregatio uredo demitto acerbitas curriculum angustus.',
                userId: 2,
                categoryId: 1
            },
            {
                title: 'Ciminatio acervus calcar dedico cervus debitis cometes vomica.',
                postText: 'Celebrer turbo vetus. Vulgivagus carcer triduana tracto timor coerceo. Vetus volup repellat condico vitiosus basium. Conitor cogo adipiscor laudantium. Claudeo quia tenax vinculum crastinus.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Ipsum tamen corrumpo vulgivagus tristis talus charisma.',
                postText: 'Tracto illum adduco cubo. Ipsam utor tergo deleo cuppedia tametsi alius aestas. Cui fugiat ara ipsam eum. Tui dignissimos cognomen. Aeneus aut communis verus curtus vix deripio conturbo.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Adamo theologus admitto tantum officiis similique annus sapiente.',
                postText: 'Desidero iusto vere demulceo apparatus deinde clibanus argentum apostolus nisi. Virtus concedo aliquid dolores. Cervus quibusdam ustulo aestas pectus. Angulus atrox creber commodo tamquam credo aeger artificiose amor. Coaegresco stillicidium defluo voluptates praesentium hic vomica ancilla.',
                userId: 3,
                categoryId: 3
            },
            {
                title: 'Trans beatae baiulus cultura acies barba.',
                postText: 'Defaeco dens attero auxilium. Aiunt deludo suggero deorsum tempore demens voveo arguo. Aeneus conscendo cribro tenax viridis. Copia conculco assumenda. Acquiro claro victus.',
                userId: 1,
                categoryId: 3
            },
            {
                title: 'Volubilis calamitas succurro compello minima clibanus.',
                postText: 'Crepusculum vacuus trans reprehenderit somnus cubo tricesimus careo laboriosam curso. Commemoro vilis vilis tandem atqui pauper arma denego ventosus auctor. Ater verus verbum antea color aequus doloremque corrupti anser supra. Ceno denego odio coruscus recusandae audacia colligo amplitudo spiritus. Auxilium vinum convoco.',
                userId: 2,
                categoryId: 3
            },
            {
                title: 'Spargo accusamus tepesco veniam.',
                postText: 'Centum iusto provident deduco damno accusantium cum soluta perspiciatis ventosus. Aequus deduco bestia deficio asporto ipsum triumphus. Aeger coniuratio ciminatio contabesco minima cilicium cinis. Vicinus sint tabella comprehendo validus. Celo iusto capio speciosus sumptus tamisium quae aedificium.',
                userId: 2,
                categoryId: 2
            },
            {
                title: 'Vulgo alias comptus tui claro.',
                postText: 'Decens depraedor uredo tremo. Solium trepide minus. Adopto at tutis brevis somnus tot laboriosam a. Coruscus hic adsidue thorax rem cubitum. Auxilium odio dedecor vulnus volutabrum tepesco ait adfero hic.',
                userId: 1,
                categoryId: 1
            },
            {
                title: 'Solvo accusantium clam sapiente tamquam aurum ustulo vomito.',
                postText: 'Acies delectatio nostrum. Civitas suus tum sum demo nam tutamen tersus spoliatio. Sursum aveho sperno vitium astrum torrens canis solvo. Tunc casso sint thymum. Caritas architecto vallum succedo.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Clementia benigne quaerat arbitro carus decens argumentum distinctio utique.',
                postText: 'Dedecor ratione conqueror antea taedium demum. Abundans crux conqueror pax adeo argumentum cuppedia iste itaque. Tantillus combibo adflicto uberrime. Subvenio tredecim cometes infit terror caelum pax doloribus terga cenaculum. Cruentus decretum solvo.',
                userId: 1,
                categoryId: 2
            },
            {
                title: 'Suscipit stella sunt tunc debeo tabgo.',
                postText: 'Considero tersus conventus. Enim socius natus turba adsidue acsi nesciunt canonicus venia. Verumtamen repudiandae aveho asporto neque tristis. Facilis atrocitas eligendi aliquam. Corporis venia viscus acsi.',
                userId: 2,
                categoryId: 3
            },
            {
                title: 'Tum cultura contigo amita ulterius vestrum dignissimos tenax dignissimos.',
                postText: 'Paulatim denuncio certe supra arx. Sumo quasi consequuntur cubitum auxilium bene. Celer pax usque vociferor cupressus ambulo desidero. Curo sit arx blandior ventus ante. Abundans coniuratio curis creptio.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Amissio tepesco arto.',
                postText: 'Quia vinum pauper animadverto officiis praesentium abbas verto. Articulus eveniet bardus appositus canis varietas aqua admitto accusator charisma. Verus consuasor cura conforto speculum. Addo torrens texo ceno. Thema tero tergeo tabgo.',
                userId: 2,
                categoryId: 2
            },
            {
                title: 'Convoco somnus vos currus harum adflicto acervus.',
                postText: 'Calculus confido cernuus solium vae ara sophismata adinventitias consequuntur debilito. Absconditus pecus provident adhaero demens alii stillicidium vivo caritas ascisco. Arca animi turba ventus. Curiositas odit vulgivagus traho provident aveho. Aliquid absum adulescens speciosus amicitia viscus decens bellum.',
                userId: 2,
                categoryId: 1
            },
            {
                title: 'Vigilo videlicet utilis appositus inflammatio audentia vespillo officia.',
                postText: 'Terga aro vulnero voluptas tremo cursus anser solum. Contigo nisi abduco amaritudo tempore sonitus. Sortitus accommodo caelum demonstro solutio ambitus. Amplexus depereo vetus. Cunctatio verbera amita voco asper corpus patrocinor abundans tenus aestivus.',
                userId: 2,
                categoryId: 3
            },
            {
                title: 'Acer strenuus verto conturbo subseco apparatus nam.',
                postText: 'Cilicium celo adinventitias ambitus vilitas vapulus virgo admiratio uterque. Taedium appositus tempora surculus valetudo alo charisma demonstro. Pax cum vomica admoneo careo statua somnus. Tribuo thorax tam altus crustulum delibero vomer carpo. Subnecto pecto vinco creo tabernus inflammatio amissio.',
                userId: 1,
                categoryId: 2
            },
            {
                title: 'Decumbo voluptates antepono alter avarus.',
                postText: 'Deinde caritas decerno vobis argumentum cogito spectaculum claustrum. Aegrus tergeo eaque viriliter succurro varietas ait aliqua aestus auctus. Sum acquiro spes perferendis inflammatio perspiciatis. Tener advenio suppellex pel vapulus neque alius totus angustus vero. Tribuo cado cursus celebrer sono amissio.',
                userId: 3,
                categoryId: 3
            },
            {
                title: 'Cursus cilicium thymbra eligendi carbo cunae vulgo cibus.',
                postText: 'Templum neque tutamen voveo timidus alias. Repellendus adficio reprehenderit annus. Xiphias certus copia desipio hic accendo suffragium cohibeo. Summisse dapifer odio. Sollicito aegrus defetiscor.',
                userId: 1,
                categoryId: 1
            },
            {
                title: 'Abstergo concedo ventosus.',
                postText: 'Suadeo amo contra vetus. Utrum caelum dolores pauci quo utpote comedo fuga. Ratione deputo quam. Similique veritatis consuasor aureus tempore debeo ademptio comparo. Vestrum vetus audeo coniuratio caterva.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Accedo templum aequus combibo.',
                postText: 'Acies utrimque validus aer caveo. Validus iste appono. Ultio eum officiis. Ratione cribro una confugo aliquid bibo universe auxilium. Reiciendis calcar aetas avaritia cavus tredecim vado caute tredecim.',
                userId: 2,
                categoryId: 3
            },
            {
                title: 'Tepesco amplitudo verto repellendus cimentarius strues.',
                postText: 'Temperantia ager vulgaris depereo. Tonsor via suus claro suscipio. Tabesco pauci crustulum conqueror attonbitus aggredior coma. Timor eveniet debeo alo timor voluptatem adiuvo decor vero. Acidus ut adfectus ascit absum clarus via caterva cometes aedificium.',
                userId: 1,
                categoryId: 2
            },
            {
                title: 'Caute deinde cernuus tertius stella verto aspicio.',
                postText: 'Veniam velum inventore aspernatur caterva pecus tepesco. Somniculosus volo subiungo tenus triduana. Conculco callide uterque abeo carus. Vestigium damnatio delectatio architecto nemo aufero subnecto cursus pecus sopor. Collum sustineo ara cernuus laboriosam surculus atrox ocer minima.',
                userId: 1,
                categoryId: 1
            },
            {
                title: 'Ambulo deporto coniuratio terga comparo cupressus.',
                postText: 'Sumptus aetas beatae vociferor. Adnuo quasi sollicito creber vos decretum. Bibo tantillus corrumpo ipsum vulnero curiositas iste defendo teres aptus. Curis suspendo creber decumbo ago. Cupiditate antepono numquam amaritudo thymbra fugiat.',
                userId: 2,
                categoryId: 3
            },
            {
                title: 'Tenuis maiores ratione excepturi possimus cubicularis delinquo contabesco tolero.',
                postText: 'Xiphias verto termes arbitro surgo. Consequuntur talio ipsa crur hic pectus. Tabesco apto denuncio mollitia totus arbitro cumque vel ustulo. Texo rerum tempus acerbitas allatus contego ceno. Coniuratio consectetur vallum dedico derideo amicitia alter sublime vapulus.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Tenus bos valde vesper vestrum celer agnitio atrox.',
                postText: 'Decipio concido creber defero territo depono mollitia. Comitatus abbas alo varietas voluptatum alienus inventore baiulus clam. Denique aetas uredo. Patior surculus ait maxime verumtamen doloribus. Socius coniuratio traho molestias ipsam textilis earum reiciendis defaeco villa.',
                userId: 1,
                categoryId: 3
            },
            {
                title: 'Somnus cruciamentum tremo.',
                postText: 'Decor cupiditate alias cohors amplexus abstergo atavus ante demitto quia. Viscus confido laudantium blandior caterva rem abduco conturbo. Virtus sursum subseco. Natus sed coepi amiculum dolor creta nulla officiis. Vigilo uberrime corrupti circumvenio aperio cotidie cubo.',
                userId: 3,
                categoryId: 3
            },
            {
                title: 'Uberrime ademptio conor quod.',
                postText: 'Decipio tantillus celer amitto adversus usque tabesco urbanus. Volva tero atavus vinitor laborum texo amplitudo. Constans amor somnus clam blandior velociter civitas. Arto ullus quos compello verto amo sunt patria. Ventito sperno adsidue vociferor victus sapiente desidero civitas animus tergiversatio.',
                userId: 1,
                categoryId: 2
            },
            {
                title: 'Facere consequatur vulgo.',
                postText: 'Carcer currus decumbo creator adulescens aggredior vereor cuppedia. Tutis tui tum earum crudelis trucido umerus adeo. Sequi curtus harum adipisci clarus. Repudiandae velum utroque voluptatum ipsum defessus celer. Vicinus comprehendo villa attollo uterque apparatus coaegresco adsum debitis.',
                userId: 3,
                categoryId: 1
            },
            {
                title: 'Inventore comedo veritatis bibo.',
                postText: 'Necessitatibus cena vir degusto aeger complectus vilicus urbanus currus. Cogito abutor una. Considero cum coniecto admoveo succedo amplexus temptatio. Alius vapulus laboriosam cur similique. Theatrum delectus colo tyrannus denego argentum ars terminatio versus molestiae.',
                userId: 3,
                categoryId: 3
            },
            {
                title: 'Debeo eos aureus.',
                postText: 'Assumenda tempora delibero talis vociferor blandior vulpes. Temporibus causa excepturi casso adiuvo eligendi accedo curo consequuntur corporis. Ex vesco demoror peior. Vesco verbum canis aqua vel suppono. Summopere suffragium terra charisma strues appello.',
                userId: 1,
                categoryId: 2
            },
            {
                title: 'Apostolus abutor ultra corona trado clibanus corrumpo.',
                postText: 'Apparatus blanditiis eveniet. Adamo templum venustas illum. Comparo admiratio coepi ager vociferor vinitor thymbra. Conatus aegrus paulatim alveus voluptate claro. Cometes cotidie careo atqui aduro veritatis.',
                userId: 3,
                categoryId: 1
            },
            {
                title: 'Quod amicitia curis arca ulterius subiungo creator clamo.',
                postText: 'Labore credo brevis triumphus pax asperiores. Totidem earum sui adduco ex custodia crudelis. Centum campana commemoro basium depulso magnam colligo caries valeo videlicet. Aer vindico adaugeo vulgivagus vulnus aperio caelum deinde. Synagoga adsuesco comptus demonstro antea.',
                userId: 1,
                categoryId: 3
            },
            {
                title: 'Curto vulgus comburo dolorum.',
                postText: 'Ambulo unde armarium cur cedo soluta absum tabella. Voco compono quisquam decet ustulo odio aliquid caveo animadverto amplitudo. Capillus statim tricesimus vero contigo clementia. Sollers amplus verecundia cado. Omnis cras talus verecundia necessitatibus turbo amplitudo dolorem spoliatio conturbo.',
                userId: 2,
                categoryId: 1
            },
            {
                title: 'Acquiro error substantia abscido eius pel copia conatus capto tandem.',
                postText: 'Aedificium veniam tubineus sol artificiose officia videlicet surculus tergum. Cavus repellendus coniuratio sono vomito cauda deinde adsidue agnitio cras. Sperno angelus patior civis attero congregatio commodi vulnus. Provident confido conduco deduco studio doloremque arbitro agnosco adipiscor candidus. Sui crepusculum sol valeo vivo corrumpo quidem bene tempore.',
                userId: 1,
                categoryId: 3
            },
            {
                title: 'Theologus rerum cupressus expedita color spargo sordeo bestia.',
                postText: 'Inflammatio laboriosam debilito accedo. Urbanus corrumpo tamquam dolor. Tibi crastinus tutis antiquus umbra tener vesica pel maxime spero. Thymbra ulterius vilicus carpo tabesco voluptate subvenio articulus decumbo volutabrum. Complectus doloremque illum adipisci surculus adaugeo cattus curiositas caput.',
                userId: 1,
                categoryId: 1
            },
            {
                title: 'Aetas vicinus exercitationem vesco ulterius.',
                postText: 'Beatae vae tres valetudo aeneus concedo terebro. Suadeo canis verto vorago tamdiu. Demoror ceno copia curo accommodo congregatio demonstro conor. Aut doloribus depereo advenio vulgo aperte aufero trepide. Crebro nostrum abscido temperantia denuo vesica thesaurus totus demo conservo.',
                userId: 2,
                categoryId: 3
            },
            {
                title: 'Accedo accusator ara communis apostolus copia.',
                postText: 'Stipes caput texo teres reprehenderit vita clarus tres tantillus atrocitas. Celebrer thymum vergo decerno cursim fugiat avaritia ater denuncio tersus. Titulus tactus accusantium aqua. Atrox abscido pecco peccatus adipisci aedificium aliqua est. Peior calcar occaecati cervus abbas carmen careo bene comprehendo.',
                userId: 3,
                categoryId: 1
            },
            {
                title: 'Qui ab aureus unde decipio urbanus.',
                postText: 'Culpa nostrum utpote trepide cribro nostrum paens dapifer corona. Demonstro clibanus tempus stillicidium. Decens distinctio amplitudo cattus arx. Depromo reprehenderit vomica cerno porro substantia dolores crux. Assumenda ducimus acidus pax demoror ad circumvenio vester.',
                userId: 3,
                categoryId: 3
            },
            {
                title: 'Verecundia voluptates amplitudo delibero.',
                postText: 'Thalassinus officiis contego volo. Ratione tepidus concido advoco soluta cedo. Paens tenax defleo denuo validus desolo vos. Aegrus alo pax una acervus laudantium. Artificiose aranea repellendus tollo ter expedita peccatus abutor.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Vulnero nam sono volva arbor curo claustrum praesentium animus verumtamen.',
                postText: 'Asper officia conqueror debeo abbas animi ascit. Adipiscor tollo tandem stips appono crur. Spiculum censura modi perspiciatis stella sapiente atque custodia utor deprimo. A civitas tabernus. Amoveo viduo demens terror cunabula tenus suffoco.',
                userId: 1,
                categoryId: 3
            },
            {
                title: 'Doloribus cupiditas cernuus angustus creator perspiciatis templum caries vomer ager.',
                postText: 'Umquam audeo vilitas aliquid suscipit cibo aequitas sperno. Cilicium cohibeo cogo adulescens amita acies. Talis creo veniam super vereor reprehenderit voro considero tenuis. Auxilium accommodo causa tam saepe. Cura est cupiditate ambulo ventosus ventus.',
                userId: 2,
                categoryId: 1
            },
            {
                title: 'Antiquus ipsum antiquus vicissitudo victus.',
                postText: 'Dens nam depereo saepe angustus. Desipio somnus color necessitatibus anser adipiscor summa cimentarius sordeo. Subnecto solum utrum adficio. Suasoria custodia sperno colo deserunt sponte absconditus. Sunt eius tendo veritas vulariter suffoco subnecto verecundia barba.',
                userId: 2,
                categoryId: 3
            },
            {
                title: 'Tempus qui canonicus paulatim.',
                postText: 'Ipsa timor speciosus agnosco benevolentia deorsum amplexus sublime centum. Sufficio supellex tutis abeo. Veritas minus atrox cumque infit comedo vester. Caecus comedo alo aduro demum. Cerno alo assumenda tepesco aeneus desolo subseco canonicus degusto deorsum.',
                userId: 1,
                categoryId: 3
            },
            {
                title: 'Volup balbus pax.',
                postText: 'Ara succurro sto. Bene viscus arcesso tenetur. Alter angustus absum. Coadunatio vito velut delicate libero sperno porro calcar acsi. Admiratio templum cultura porro copiose deduco.',
                userId: 2,
                categoryId: 3
            },
            {
                title: 'Pauper degenero vere atque vicissitudo sui advoco aegrus utrum.',
                postText: 'Catena delinquo colligo textus debeo unde caute. Textor alii teneo inventore tutis concedo degenero asporto. Abscido tripudio maiores. Usque demergo illo textus asperiores conor totus comes bos circumvenio. Video quos vorax tondeo praesentium capillus.',
                userId: 2,
                categoryId: 1
            },
            {
                title: 'Vergo tenetur theca utilis.',
                postText: 'Coruscus taceo totidem suppellex ulterius necessitatibus ipsum. Admitto tempus architecto arbor antepono. Truculenter vesica spes valens amicitia. Sollers creo assentator abeo. Vulgo speculum consequuntur caste spes verbum color.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Reprehenderit talus textus veritas apostolus conqueror tergo subiungo cauda.',
                postText: 'Quis voluptate approbo derelinquo. Comminor laboriosam alo via cuppedia. Nesciunt theca claudeo. Suspendo vox suffoco causa. Articulus succurro nihil territo amoveo teneo.',
                userId: 1,
                categoryId: 2
            },
            {
                title: 'Cultura tener studio sumptus claudeo auxilium advoco.',
                postText: 'Audentia apto canto. Theologus accommodo admitto curatio alius. Desidero solus creber. Tam suscipio beatus thorax sortitus. Ver ancilla ultio corrigo vigor.',
                userId: 1,
                categoryId: 3
            },
            {
                title: 'Spero utrimque atrox similique nemo enim degero uxor sunt.',
                postText: 'Ademptio correptius curtus laboriosam decipio territo. Necessitatibus surgo tabella abeo occaecati vulgaris cimentarius doloremque molestiae. Reprehenderit delicate cogo. Tero tondeo deleo aggero temptatio. Atavus defetiscor stipes sub vulariter bibo tenus video ademptio adfectus.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Administratio volo cohibeo coniuratio tandem corpus tripudio comburo contra tabula.',
                postText: 'Tutis supra adicio carmen vulgo. Unus auxilium labore aggero accusantium doloribus. Videlicet toties asperiores asper vorax. Ustulo cumque sopor sodalitas. Cupressus tot paulatim vomito celo cursus consectetur desipio sursum.',
                userId: 1,
                categoryId: 1
            },
            {
                title: 'Beneficium tondeo pectus attollo currus quisquam desparatus tyrannus.',
                postText: 'Acsi victoria cogo decens optio surgo nam tredecim usque. Cras talus denuncio annus. Tabernus cubo utor amicitia vergo tametsi. Balbus cohaero baiulus ambulo aureus ambulo caries. Timidus aspernatur talio comprehendo aestas conscendo terebro venia.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Aetas ancilla quo vesco summisse tantillus molestias arbor amaritudo eius.',
                postText: 'Circumvenio capitulus aequitas itaque ocer corrigo beneficium viriliter incidunt deripio. Cometes thema pax pauci voluntarius villa vomica cimentarius caelestis. Cimentarius temeritas aer summa bardus pecco. Depraedor demens vix ater cicuta clamo admoneo arto arcus. Perferendis clamo veritas adipisci derelinquo consuasor canonicus calamitas eligendi tutis.',
                userId: 1,
                categoryId: 3
            },
            {
                title: 'Tero deputo clam caveo vitium.',
                postText: 'Adstringo aeger solitudo capto adnuo aer aveho agnosco exercitationem. Tremo adulatio urbs solio cetera territo. Speculum atrox quasi sit apostolus ab aestus capto. Amaritudo amplitudo desipio suffoco communis ventito spargo paulatim. Apto tollo suscipit una ultio thermae.',
                userId: 3,
                categoryId: 3
            },
            {
                title: 'Colligo trepide arma umquam sol acquiro deleniti adopto facilis.',
                postText: 'Adsuesco iure cornu spiritus textor tabernus voveo atavus sophismata. Cariosus cumque doloremque depraedor viduo audacia curtus omnis deduco capio. Cogo angulus coniuratio quisquam coepi pecco. Demonstro correptius terror una. Eligendi victus demo textus tabgo temporibus supellex adaugeo vinitor pel.',
                userId: 2,
                categoryId: 2
            },
            {
                title: 'Adfectus sollers tutis succurro sponte ventito cupiditate adeo.',
                postText: 'Contigo deinde dapifer. Crinis neque natus maxime custodia conicio deprimo tabgo sollicito. Admoneo acceptus exercitationem quas deleniti patruus administratio sit. Crepusculum culpo verumtamen tres utpote bellicus conatus civitas. Atqui quae bardus facilis amita cuius dolorem.',
                userId: 3,
                categoryId: 1
            },
            {
                title: 'Aeger uberrime somniculosus ver deserunt desino.',
                postText: 'Soleo illo deporto basium assumenda vivo crebro. Impedit accedo ipsa vetus annus vaco. Admitto nesciunt tenus dolorum. Cubicularis comprehendo desolo territo cibo. Defero comminor comprehendo autus.',
                userId: 2,
                categoryId: 2
            },
            {
                title: 'Certe harum minima armarium cernuus communis commemoro adiuvo.',
                postText: 'Cursus nemo cohors blanditiis textus admoneo. Inventore amaritudo tremo ipsa cupiditas tutis cogito civis arguo comitatus. Bonus tener theca. Conventus cito corroboro depulso cilicium sto. Civitas adipiscor quaerat.',
                userId: 2,
                categoryId: 3
            },
            {
                title: 'Umerus animus votum comptus.',
                postText: 'Atavus degusto animus attollo suppellex surculus cubitum centum dens error. Denego censura aperte vitae uxor. Peior quis benigne deleniti. Conqueror verecundia eius velut toties vulpes. Aer coepi adduco defetiscor tener suggero patrocinor facere conitor candidus.',
                userId: 2,
                categoryId: 2
            },
            {
                title: 'Apud ipsam vulpes arx confido consequatur cras absconditus.',
                postText: 'Culpa curtus temeritas aegrotatio itaque commemoro conscendo sumptus. Acer creptio itaque. Terreo occaecati crebro. Culpa cubicularis teres. Curto conspergo stips denuncio derelinquo bestia delibero ante speciosus.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Distinctio celebrer aptus bos autus collum decet correptius.',
                postText: 'Accusantium crudelis conventus doloribus. Cognatus tricesimus tandem caput acervus debeo vehemens pecus verus aestus. Avaritia et admiratio vestrum. Tripudio constans vallum amoveo aranea deripio claudeo sortitus conicio surculus. Patior quam nulla demergo velut perferendis damnatio.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Crebro volutabrum velum ager triduana reprehenderit cohors velum ascit.',
                postText: 'Avaritia tenetur suppellex auctor depopulo ver adhaero coaegresco deleniti. Claustrum bellicus curso vorax cribro adhaero trepide. Tollo arbustum ciminatio harum abduco sordeo. Thorax ambulo vesco volva cribro aggredior clibanus acer nemo. Delinquo voluptas cimentarius adflicto usitas argentum vapulus ancilla defessus.',
                userId: 1,
                categoryId: 1
            },
            {
                title: 'Sustineo vergo cotidie.',
                postText: 'Assentator tum articulus nihil somniculosus vester varietas placeat optio. Voluptate ea soleo. Acies validus virtus argentum degusto tenax adfectus cubicularis. Eveniet vere bos votum. Aeternus crustulum avarus arbor.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Eaque amiculum audio illum surgo.',
                postText: 'Mollitia pauci cito. Combibo deficio dolore trans trans. Astrum alveus damnatio cunctatio placeat culpa. Tabula tabula utor claustrum apud. Dolores tempore subvenio.',
                userId: 3,
                categoryId: 2
            },
            {
                title: 'Fugit non peccatus pecus asper curso argentum.',
                postText: 'Vallum dedecor credo voro alii cilicium caput angulus acies. Talio terebro aliquid virga repellat thymbra sursum. Aggredior conventus speciosus minus consequatur crinis theca maiores colligo. Cunae bellicus charisma curtus contigo. Altus ascisco suadeo cupiditas color deprecator.',
                userId: 3,
                categoryId: 3
            },
            {
                title: 'Casso antepono debeo vorax vomer adulatio cognatus condico.',
                postText: 'Speculum torrens argumentum sopor avaritia. Claudeo vinitor caelestis despecto candidus validus. Abeo consequatur adulescens amissio aufero totam provident. Spargo abundans cito viriliter suppellex arbustum. Benevolentia adsuesco charisma assumenda necessitatibus apto tredecim bellicus crastinus.',
                userId: 1,
                categoryId: 3
            },
            {
                title: 'Abeo coruscus crebro cupio cervus taedium vestrum caute canto.',
                postText: 'Tempore veniam ter amaritudo cultura pauci agnitio cuius ambulo defetiscor. Cubo spoliatio clam. Arto tamdiu stella ago victoria labore complectus dedecor. Ab consuasor atrocitas ciminatio patior. Usitas curtus correptius agnitio acsi varietas arbitro.',
                userId: 1,
                categoryId: 3
            },
            {
                title: 'Advoco animi talus tenuis amplexus acervus infit.',
                postText: 'Temporibus combibo sui degenero necessitatibus audeo utique cogito. Aranea tui vivo canis spes non aufero coniuratio vinitor virga. Adstringo solitudo peior eius utor. Demens adiuvo carcer teneo tero approbo corrumpo suasoria arx. Sol agnosco arbustum trepide.',
                userId: 2,
                categoryId: 2
            },
            {
                title: 'Vulnero alienus adfero cursus audeo coadunatio.',
                postText: 'Derideo cervus auxilium incidunt pecco cuppedia talis ex acies volaticus. Aliquid tutis rem mollitia sonitus. Tardus beneficium speciosus cresco minus civis non dapifer sperno vulgaris. Sumo optio accusator vesper uberrime cruentus tripudio. Appello aveho minus sono sollers.',
                userId: 3,
                categoryId: 1
            },
            {
                title: 'Sint dolore acidus quibusdam tego talis tener vox.',
                postText: 'Speculum bis vigilo coma tamisium truculenter ulterius solitudo surculus. Vespillo advoco arma vesper. Aequitas urbanus despecto delectus amicitia arbustum conscendo. Avarus ultra defetiscor agnosco tui vicissitudo atrox confido volo. Ipsam usque compello tondeo amissio.',
                userId: 3,
                categoryId: 3
            },
            {
                title: 'Alius officiis credo.',
                postText: 'Stillicidium hic contabesco vinum. Odio volaticus tergo textilis aegrotatio curso degenero teres inflammatio canis. Apto vorax truculenter testimonium vivo sequi thymbra vorax totidem. Tabernus templum ustilo sponte possimus pauper una speciosus autus. Clibanus cattus veritas attonbitus comptus.',
                userId: 3,
                categoryId: 3
            },
            {
                title: 'Error cotidie deprecator.',
                postText: 'Volutabrum caecus hic debilito summisse. Dolorem sum volva hic ustulo excepturi tamisium aestas amitto utique. Candidus tibi accendo verus. Adulatio solus tremo utpote. Conventus sufficio testimonium viriliter bene civitas caelum velociter.',
                userId: 1,
                categoryId: 2
            },
            {
                title: 'Triduana rerum ademptio desparatus.',
                postText: 'Viriliter validus verbera deserunt. Cui tepesco dens debilito traho tenax doloribus subito pecus apto. Arbustum sublime copiose accommodo minima ubi theca abscido ars. Assentator deorsum cedo toties subiungo. Subito conscendo circumvenio molestiae demulceo aegrus caveo coma.',
                userId: 3,
                categoryId: 3
            },
            {
                title: 'Suffoco vere decor truculenter eum infit.',
                postText: 'Repellat vos vaco. Stips trado deripio accommodo ocer trucido depulso delectus cibo demoror. Angelus vinum eius. Dedecor tergiversatio deprimo solus cognomen doloremque. Depopulo credo dignissimos suasoria statim compello aeternus acerbitas.',
                userId: 1,
                categoryId: 1
            },
            {
                title: 'Vesper ciminatio tricesimus fugiat numquam acceptus demergo.',
                postText: 'Turpis minima tabesco arbor cruentus benigne. Advenio tergo sed infit vorago cogito solium volubilis angulus curis. Causa stillicidium vespillo degusto balbus. Eos universe tabella culpo defaeco carmen hic arcesso solitudo. Casus capio depraedor.',
                userId: 2,
                categoryId: 2
            },
            {
                title: 'Toties collum deleo paens ambulo possimus infit talus stillicidium patria.',
                postText: 'Degusto adhuc abscido iure vomica solus dolorem. Adstringo sperno tactus ambulo iure solium. Spiculum tonsor tertius. Thalassinus aliquid odit caecus. Pecus cogo ademptio socius ultio.',
                userId: 1,
                categoryId: 3
            },
            {
                title: 'Arma adulatio tyrannus teneo vitium debeo.',
                postText: 'Tenus totidem conforto. Illo ater spero laboriosam verecundia. Vestigium considero curso aufero nemo vere. Vestigium supellex atque aut appositus. Numquam sordeo summa sodalitas sollers alter voco vomer.',
                userId: 1,
                categoryId: 2
            },
            {
                title: 'Summopere pariatur vinco artificiose molestiae comparo.',
                postText: 'Laborum accendo cervus aestivus venustas tibi atque triduana. Accusator dolore natus. Dens curvo aspernatur adsidue adsuesco. Suppono spiculum votum. Surgo tenus corpus templum.',
                userId: 3,
                categoryId: 1
            },
            {
                title: 'Doloribus sodalitas defaeco conturbo.',
                postText: 'Vis uredo eligendi infit. Cimentarius quaerat tamen voluptatibus tamquam veritas dolore canto comis. Caute suasoria eius saepe trepide sonitus aufero. Summopere amoveo civitas. Apparatus maiores varius paens censura adiuvo cometes amicitia neque aperte.',
                userId: 1,
                categoryId: 1
            },
            {
                title: 'Dolorum defluo congregatio.',
                postText: 'Adsuesco tres urbs aut. Copiose verecundia ante causa confero. Enim pariatur statua colo aegrotatio cinis substantia centum vel. Deporto acquiro utroque vitae utilis soleo cui. Terror caecus cohors venio aspicio.',
                userId: 2,
                categoryId: 2
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = "Posts";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options.tableName, {
            userId: { [Op.in]: [1, 2, 3, 4] }
        }, {});
    }
};
