export default {
    roleItems: {
        Statistique: {//3 pages
            'produits': true,
            'Modérateurs': true,
            'wilayas': true,
            'orders': true,
        },

        Clients: {//done
            'List des clients': true,
            'Ajouter': true,
            'export-excel': true,
            'import-excel': true,
            'Supprimer': true,
            'Modifier': true
        },

        Produits: {
            'List des produits': true,
            'Ajouter': true,
            'Supprimer': true,
            'Modifier': true,
            'Statistique': true,
            'Bénéfice du produit': true,
            'Options des produits': true,//show list
            "type d'options": true,//show list
        },

        Modérateur: {
            'List des Modérateur': true,
            'Ajouter': true,
            'Supprimer': true,
            'Modifier': true,
        },

        Roles: {
            'List des roles': true,
            'Ajouter': true,
            'Supprimer': true,
            'Modifier': true,
        },

        Livraison: {
            'Liste des livreurs': true,
            'Société de livraison': true,
            'statuts  livraison': true,
            'Frais de livraison': true,
        },

        'Gestion des statuts': {
            'statuts généraux': true,
            'statuts conformation': true,
            'statuts  livraison': true,
            'statuts annulée': true,
        },

        Boutique: {
            'List dés boutique': true,
            'Bilan de boutique': true,
            'charges': true,
            'Simulateur de prix': true,
        },

        Orders: {
            "list d'orders": true,
            'Ajouter': true,
            //'Supprimer': true,
            'Modifier': true,
        },

        "En confirmation": {//1
            "En confirmation": true,
            "Annuler": true,
            "Supprimer": true,
            "Confirmer les commandes": true,
            "Modifier": true,
            "Assigner à un employé": true,
            //"Modifier la réduction": true,
            //"Modifier le prix de vente": true,
            //"Modifier les frais de livraison": true,
            //"Actions en masse": true
        },

        "En dispatch": {//2
            "En dispatch": true,
            "Annuler": true,
            "Revenir en arrière": true,
            //"Changer le livreur": true,
            "Imprimer les étiquettes": true,
            //"Imprimer la feuille de route": true,
            "Expédier": true,
            "Envoyer à la livraison": true,
            "Expédier par Excel": true,//new
            // "Exporter": true,
            //"Modifier": true,
            //"Modifier la réduction": true,
            //"Modifier le prix de vente": true,
            //"Modifier les frais de livraison": true,
            //"Actions en masse": true,
            //"Désactiver la synchronisation": true
        },

        "En livraison": {//3
            "En livraison": true,
            "Revenir en arrière": true,
            //"Changer le livreur": true,
            "Valider la livraison": true,
            //"Valider par excel": true,// to 4
            "Demander le retour": true,// failed
            "Demander le retour par Excel": true,// failed

            //"Modifier": true,
            //"Modifier la réduction": true,
            //"Modifier le prix de vente": true,
            //"Modifier les frais de livraison": true,
            //"Actions en masse": true,
            //"Désactiver la synchronisation": true
        },

        "Livrée": {//4
            "Livrée": true,
            "Revenir en arrière": true,
            "Préparer le bon": true,
            "Valider par excel": true,// to payment //ok
            'Valider la réception': true,
            //"Modifier": true,
            //"Modifier la réduction": true,
            //"Modifier le prix de vente": true,
            //"Modifier les frais de livraison": true,
            //"Actions en masse": true,
            //"Désactiver la synchronisation": true
        },

        "Livraison échouée": {//5
            "Livraison échouée": true,
            "Revenir en arrière": true,
            //"Valider le retour": true,
            //"Préparer le bon": true,
            "Valider la réception": true,
            // "Valider la réception par Excel": true,// to retours new

            /*
            *
            "Modifier": true,
            "Modifier la réduction": true,
            "Modifier le prix de vente": true,
            "Modifier les frais de livraison": true,
            "Actions en masse": true,
            "Désactiver la synchronisation": true
            * */
        },
        'Encaissée': {//6
            'Encaissée': true,
            "Revenir en arrière": true,
            'Confirmer': true,
            "Confirmer par Excel": true,//new '/orders/to/confirm-retours'
        },

        "Retournée": {//7
            "Retournée": true,
            "Revenir en arrière": true,
            'Confirmer': true
        },

        "Annulée": {//8
            "Annulée": true,
            "Supprimer": true,
            "Restaurer": true,
            //"Actions en masse": true
        },

        Source: {
            'List des sources': true,
            'Ajouter': true,
            'Supprimer': true,
            'Modifier': true
        }
    }
}
