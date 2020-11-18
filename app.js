const textDiv = document.getElementById('text') // SELECTION DE NOTRE CHAMP TEXTE
const optionBtn = document.getElementById('option-buttons') //SELECTION DU CONTENEUR DE BOUTTONS

let bag = {} // INVENTAIRE DU JEU INITIÉ


// FONTION DE LANCEMENT DU JEU, PREND LE PREMIER SCRIPT
function startGame() {
    bag = {}
    showTextNode(1)
}

//AFFICHE UN SCRIPT EN FONCTION DE SON ID
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex) //on cherche dans notre tableau de script, un script qui a le même id que celui demandé
    textDiv.innerText = textNode.text // on l'injecte dans notre html
    while (optionBtn.firstChild) { // suppression des anciens boutons d'option
        optionBtn.removeChild(optionBtn.firstChild)
    }

    textNode.options.forEach(option => { //pour chaque option dans le script séléctionné
        if (showOption(option)) {
            const button = document.createElement('button') //on créer un boutton
            button.innerText = option.text //on rempli son contenu par une option
            button.classList.add('btn') // on lui ajoute la classe boutton
            button.addEventListener('click', () => selectOption(option)) // au click, on choisi cette option
            optionBtn.appendChild(button)
        }
    })
}

//RETOURNE LE CONTENU DU SAC
function showOption(option) {
    return option.requireBag == null || option.requireBag(bag);
}


function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    bag = Object.assign(bag, option.addBag)
    showTextNode(nextTextNodeId)
}
////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////:TABLEAU DE SCRIPT DU JEU
////////////////////////////////////////////////////////////////////////////
const textNodes = [
    //chaque étape est définie par un id unique, le texte narratif, et une suite d'options
    {
        id: 1,
        text: 'Vendredi soir, dernière journée de travail, tout vos collègues sont déjà partis depuis bien longtemps. Seul au bureau, vous décidez que vous en avez assez fait, clés de voiture en main, vous vous apprêtez à quitter l\'open-space.',
        options: [
            //suite d'options (bouton)
            {
                text: 'Éteindre la lumière et partir',

                nextText: 2
            },
            {
                text: "Partir",
                addBag: { lightsOn: true },
                nextText: 2
            }
        ]
    },

    {
        id: 2,
        text: 'Une fois la porte de l\'open-space fermée, vous pouvez prendre l\'ascenceur quelque peu vétuste à gauche, ou les escaliers en béton, à droite',

        options: [

            {
                text: 'Prendre l\'ascenceur',
                nextText: 10
            },
            {
                text: "Prendre les escaliers",
                nextText: 3
            }
        ]
    },

    {
        id: 3,
        text: 'Vous dévalez ces escaliers, personne n\'aime les emprunter, peut être est-ce à cause de l\'odeur de cave omniprésente, ou bien la sensation d\'être enfermé dans un bunker ... Vous ne vous rappelez pas les avoir un jour utilisés seul ...',

        options: [

            {
                text: 'Continuer à descendre',
                nextText: 4
            }
        ]
    },

    {
        id: 4,
        text: '3, 2, 1, 0, plus qu\'un étage et vous êtes enfin au parking, plus que quelques marches ... -1, la main sur la poignée de porte coupe-feu, vous réalisez soudain qu\'à côté de vous, les escaliers continuent à descendre, mais à votre connaissance, il n\'y a pas de -2 au parking. De là où vous êtes, impossible de voir à quoi ils mènent, un frisson vous parcourt ...',

        options: [

            {
                text: 'Se dépêcher d\'ouvrir la porte et s\'engouffrer dans le parking',
                nextText: 5
            },
            {
                text: "Prendre les escaliers",
                nextText: 14
            }
        ]
    },

    {
        id: 5,
        text: 'Vous êtes essouflé, avec l\'impression d\'avoir échappé à quelque chose, vous vous dirigez vers votre voiture, jetant des regards furtifs derrière vous. Vous vous empressez de la dévérouiller, à peine installé, vous mettez le contact et roulez dans les allées sombres du parking sous-terrain jusqu\'à la sortie. Une fois dehors, la nuit bien tombée, vous apperçevez dans votre rétroviseur le bloc intégralement noir que forme les locaux de votre entreprise.',

        options: [

            {
                text: 'Il vous semblez avoir laissé la lumière allumée',
                requireBag: (currentBag) => currentBag.lightsOn,
                nextText: 7
            },
            {
                text: "Rentrer chez vous",
                nextText: 6
            }
        ]
    },

    {
        id: 6,
        text: 'Après 45mn de route vous arrivez chez vous. Lundi, lorsque vous retournez au travail, de gros scotchs jaunes quadrillent le bâtiment, les autorités ne vous laisseront pas entrer, ni ne vous donneront d\'explication, malgré tout, vous distinguez une tante médicale plantée vers les fourgons de police... ',

        options: [

            {
                text: 'On vous reconduit à votre voiture, vous serez muté dans une autre région la semaine d\'après',
                nextText: 100
            }
        ]
    },

    {
        id: 7,
        text: 'vous n\'avez pas éteint la lumière, pourtant vous n\'êtes témoin que de l\'obscurité la plus totale...',

        options: [

            {
                text: 'S\'arrêter et faire demi-tour',
                nextText: 8
            },
            {
                text: "Rentrer chez vous, hors de question de faire marche arrière",
                nextText: 6
            }
        ]
    },

    {
        id: 8,
        text: 'En vous rapprochant des locaux, et de l\'embouchure du parking, vous vous ravisez, l\'idée de devoir emprunter à nouveau ces escaliers vous donne la chair de poule',

        options: [

            {
                text: 'Vous rentrez chez vous, en ne respectant que partiellement les limites de vitesse',
                nextText: 6
            }
        ]
    },

    {
        id: 9,
        text: 'Vous appuyez sur le bouton de l\'ascenceur, un bruit métallique s\'ensuit, quelques instants plus tard, les portes s\'ouvrent. Vous mettez un pied dans l\'ascenceur, et toute la cage se met à osciller',

        options: [

            {
                text: 'Vous n\'avez pas confiance, prendre les escaliers',
                nextText: 3
            },
            {
                text: "Monter dans l\'ascenceur, vous y êtes habitué",
                nextText: 10
            }
        ]
    },

    {
        id: 10,
        text: 'Une fois à l\'intérieur, vous pressez le bouton -1, et attendez. Les portes se referment et vous entendez de nouveaux des bruits métalliques ... les bruits s\'accentuent pourtant l\'ascenceur ne semble pas bouger ... il doit être bloqué',

        options: [

            {
                text: 'Appuyer sur le bouton pour ouvrir les portes',
                nextText: 11
            },
            {
                text: "Attendre nerveusement",
                nextText: 11
            }
        ]
    },

    {
        id: 11,
        text: '... Tiens plus de bruit ... ',

        options: [

            {
                text: '...',
                nextText: 12
            },
            {
                text: "...",
                nextText: 12
            }
        ]
    },

    {
        id: 12,
        text: 'SOUDAIN l\'ascenceur craqua, un bruit strident de métal rouillé griffant des parois vous saisit les tympans, les mains sur les oreilles vous ne vous rendez compte que trop tard de l\'ouverture des portes. D\'un coup vous sentez le sol disparaître sous vos pieds, la chute libre de l\'appareil  vous donne l\'impression de flotter, moins de 5 secondes plus tard vous vous écrasez au sol, le néon du plafond venant s\'exploser au sol à côté de votre tête. Vous réussissez tant bien que mal à vous relever... sonné ... vous vous dirigez vers les portes entre-ouvertes de l\'ascenceur, et sortez.',

        options: [

            {
                text: 'Scruter la pénombre',
                nextText: 13
            }
        ]
    },

    {
        id: 13,
        text: 'Bien que vous soyez choqué de votre accident, vous êtes saisi par l\'odeur présente, une forte odeur de cave ... et ces murs ... vous ne vous en rappelez pas. Vous vous retournez vers l\'ascenceur et observez un écriteau "-2" au dessus de l\'encadrure des portes ... Vous ne vous sentez pas très bien ... votre seule envie est de rentrer chez vous, à votre gauche, un escalier remonte, à votre droite, un couloir totalement sombre.',

        options: [

            {
                text: 'Remonter en vitesse et s\'engouffrer dans le parking',
                nextText: 5
            },
            {
                text: "Prendre le couloir",
                nextText: 15
            }
        ]
    },

    {
        id: 14,
        text: 'Intrigué... vous descendez prudemment les escaliers, et appercevez un peu plus bas, une porte d\'ascenceur, fermée. Vous êtes maintenant au -2, quelque chose vous pousse à remonter, mais vous vous demandez ce qu\'il peut bien y avoir au bout de ce couloir que vous venez d\'apperçevoir...',

        options: [

            {
                text: 'Remonter en vitesse et s\'engouffrer dans le parking',
                nextText: 5
            },
            {
                text: "Prendre le couloir",
                nextText: 15
            }
        ]
    },

    {
        id: 15,
        text: 'Vous marchez quelques secondes, plus aucune lumière ne vous éclaire, vous allumez votre téléphone pour voir où vous mettez les pieds. Trois portes se dressent devant vous.',

        options: [

            {
                text: 'Ouvrir la porte de gauche',
                nextText: 16
            },

            {
                text: 'Ouvrir la porte centrale',
                nextText: 17
            },

            {
                text: "Ouvrir la porte de droite",
                nextText: 18
            }
        ]
    },

    {
        id: 16,
        text: 'Vous ne parvenez pas à l\'ouvrir',

        options: [

            {
                text: 'Essayer une autre porte',
                nextText: 15
            },
            {
                text: "Rebrousser chemin, et remonter les escaliers",
                nextText: 5
            }
        ]
    },

    {
        id: 17,
        text: 'La porte s\'ouvre, une grande pièce vide dégageant une senteur d\'humidité et de poussière s\'étale sous vos yeux, vous parvenez à distinguer un trou dans l\'épais mur de béton. En vous rapprochant avec la lumière de votre téléphone, il vous semble apperçevoir quelque chose qui vous reflète un peu de lumière...',
        options: [

            {
                text: 'Se rapprocher plus près, augmenter la lumière',
                nextText: 19
            },
            {
                text: "Rebrousser chemin, et remonter les escaliers",
                nextText: 5
            }
        ]
    },

    {
        id: 18,
        text: 'La porte à moitié ouverte s\'ouvre sur ce que l\'on pourrait appeler un débarras, vous n\'avez pas la place de circuler et faites marche arrière',

        options: [

            {
                text: 'Choisir une autre porte',
                nextText: 15
            },
            {
                text: "Rebrousser chemin, et remonter les escaliers",
                nextText: 5
            }
        ]
    },

    {
        id: 19,
        text: 'Vous poussez la luminosité au maximum, mais ne voyez rien dans le trou ... Vous vous demandez en quelles circonstances un trou comme celui-ci a t\'il pu être creusé.',
        options: [

            {
                text: 'Passer le bras et le téléphone  dans le trou pour prendre une vidéo',
                nextText: 20
            },
            {
                text: "Rebrousser chemin, et remonter les escaliers",
                nextText: 5
            }
        ]
    },

    {
        id: 20,
        text: 'Vous activez le mode vidéo de votre téléphone, et glissez lentement votre bras dans l\'ouverture ... Vous bougez le téléphone dans différents angles pour voir un maximum de chose AIE quelque chose vous a piqué le dessus de la main ! Sous le coup de la surprise, vous laissez tomber votre téléphone.',
        options: [

            {
                text: 'Lâcher une insulte et essayer de récupérer le téléphone',
                nextText: 21
            },
            {
                text: "Essayer de récupérer le téléphone",
                nextText: 21
            }
        ]
    },

    {
        id: 21,
        text: 'Vous glissez à nouveau votre bras dans le trou et essayez de saisir votre téléphone, vous touchez tout un tas de choses indescriptibles quand à nouveau vous ressentez une piqûre, sans aucune raison apparente vous sentez vos forces diminuer, et maintenant une sensation de petits crochets ou de petits ongles vous aggripant tout le long de votre bras vous envahit, une insupportable odeur de moisi vous emplit les narines, vous êtes persuadés que votre bras risque de s\'arracher si vous tirez un coup sec .',
        options: [

            {
                text: 'Tirer un coup sec',
                nextText: 22
            },
            {
                text: "Laisser faire",
                nextText: 23
            }
        ]
    },


    {
        id: 22,
        text: 'Vous rassemblez vos dernières forces et tirez d\'un coup sec, votre bras totalement engourdi semble avoir changé de couleur, de multiples petites aiguilles y sont plantées, vous reculez et trébuchez, vous semblez capter de plus en plus de bruissements dans les murs, vous vous attendez à voir jaillir quelque chose du trou d\'une seconde à l\'autre, vous prenez vos jambes à votre cou et sortez en courant, vos forces se dissipent de plus en plus mais bientôt vous atteignez la porte coupe-feu menant au parking.',
        options: [

            {
                text: 'Regarder derrière vous',
                nextText: 24
            }
        ]
    },

    {
        id: 23,
        text: 'Vous êtes totalement coincé jusqu\'à l\'épaule, votre vision se trouble et vous perdez entièrement la sensation de votre bras, quelque chose d\'étranger parcours vos veines, vous perdez connaissance et une dernière vision d\'horreur s\'offre à vous lorsque vous voyez clairement une main refermée sur votre bras.',
        options: [

            {
                text: 'Vous ne vous réveillerez probablement pas',
                nextText: 100
            }

        ]
    },

    {
        id: 24,
        text: 'Avec horreur vous observez quelque chose jaillir du couloir, seul les escaliers vous sépare, vous vous jetez sur la porte qui s\'ouvre dans un fracas, la panique s\'empare de vous, vous apperçevez la sortie du parking non loin de vous, mais votre voiture se situe dans la direction opposée.',
        options: [

            {
                text: 'Courir à votre voiture',
                nextText: 25
            },
            {
                text: "Courir vers la sortie du parking",
                nextText: 26
            }
        ]
    },

    {
        id: 25,
        text: 'Hors d\'haleine vous courez vers votre voiture, la déverouillez à distance, n\'osant même plus regarder derrière vous, la peur vous bouche les oreilles comme si vous étiez sous l\'eau, votre main se pose sur la poignée et la porte s\'ouvre ! Vous vous jetez dans l\'habitacle et refermez derrière vous, les mains tremblantes sur les clés, vous vous évertuez à mettre le contact, de grands coups percutent la voiture. Vous arrivez enfin à la faire démarrer et en reculant vous écrasez quelque chose, la voiture traverse le parking et vous arrivez à sortir ! Dans la rue vous grillez les feux et ne réfléchissez pas où vous allez.',
        options: [

            {
                text: 'Vous vous arrêtez sur le bas-côté',
                nextText: 27
            }
        ]
    },

    {
        id: 26,
        text: 'Hors d\'haleine, vous vous rapprochez de plus en plus de la sortie, l\'air extérieur arrive à vos poumons !  Un coup violent vous atteint au dos, la même sensation d\'aiguille que pour votre bras, sans même vous en rendre compte vous tombez au sol, inconscient.',
        options: [

            {
                text: 'Vous ne vous réveillerez probablement pas',
                nextText: 100
            }
        ]
    },

    {
        id: 27,
        text: 'Terrifié, épuisé et blessé, vous finissez votre course à l\'hôpital, vous racontez votre histoire et personne ne vous croit au premier abord, des analyses sanguines vous sont faites et un médecin vous assure que quelque chose de très dangereux vous a été injecté, à votre réveil, vous aurez une batterie de tests pour déterminer plus précisement la nature de cette substance. Le bâtiment est fermé et on suggère fortement de ne parler de cet incident à personne.',
        options: [

            {
                text: 'Vous vous endormez',
                nextText: 100
            }
        ]
    },

    {
        id: 100,
        text: '',
        options: [

            {
                text: 'REJOUER',
                nextText: 0
            }
        ]
    }



]


//ON LANCE LE JEU
startGame()


