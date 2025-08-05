// Données mockées pour la démonstration
export const mockProducts = [
  {
    id: 1,
    nom: "iPhone 15 Pro",
    description: "Le dernier smartphone Apple avec puce A17 Pro, appareil photo professionnel et écran Super Retina XDR.",
    prix: 1229.00,
    prix_final: 1229.00,
    stock: 25,
    images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop"],
    marque: "Apple",
    sku: "IPHONE15PRO-128",
    actif: true,
    note_moyenne: 4.8,
    nombre_avis: 156,
    categorie: { id: 1, nom: "Smartphones" }
  },
  {
    id: 2,
    nom: "MacBook Air M2",
    description: "Ordinateur portable ultra-fin avec puce M2, écran Liquid Retina 13,6 pouces et autonomie exceptionnelle.",
    prix: 1499.00,
    prix_final: 1299.00,
    prix_promo: 1299.00,
    en_promotion: true,
    stock: 15,
    images: ["https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop"],
    marque: "Apple",
    sku: "MBA-M2-256",
    actif: true,
    note_moyenne: 4.9,
    nombre_avis: 89,
    categorie: { id: 2, nom: "Ordinateurs" }
  },
  {
    id: 3,
    nom: "Samsung Galaxy S24",
    description: "Smartphone Android haut de gamme avec IA intégrée, appareil photo 200MP et écran Dynamic AMOLED.",
    prix: 899.00,
    prix_final: 899.00,
    stock: 30,
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop"],
    marque: "Samsung",
    sku: "SGS24-256",
    actif: true,
    note_moyenne: 4.6,
    nombre_avis: 203,
    categorie: { id: 1, nom: "Smartphones" }
  },
  {
    id: 4,
    nom: "T-shirt Premium Coton Bio",
    description: "T-shirt en coton biologique, coupe moderne et confortable. Disponible en plusieurs couleurs.",
    prix: 29.99,
    prix_final: 29.99,
    stock: 100,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop"],
    marque: "EcoWear",
    sku: "TSHIRT-BIO-M",
    actif: true,
    note_moyenne: 4.3,
    nombre_avis: 45,
    categorie: { id: 3, nom: "Vêtements" }
  },
  {
    id: 5,
    nom: "Aspirateur Robot Intelligent",
    description: "Aspirateur robot avec navigation laser, contrôle par application et vidange automatique.",
    prix: 399.00,
    prix_final: 349.00,
    prix_promo: 349.00,
    en_promotion: true,
    stock: 20,
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop"],
    marque: "CleanBot",
    sku: "ROBOT-ASPIR-V2",
    actif: true,
    note_moyenne: 4.4,
    nombre_avis: 78,
    categorie: { id: 4, nom: "Maison & Jardin" }
  },
  {
    id: 6,
    nom: "Vélo Électrique Urbain",
    description: "Vélo électrique avec batterie longue durée, parfait pour les trajets urbains. Autonomie 80km.",
    prix: 1299.00,
    prix_final: 1299.00,
    stock: 10,
    images: ["https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=300&h=300&fit=crop"],
    marque: "UrbanBike",
    sku: "EBIKE-URBAN-L",
    actif: true,
    note_moyenne: 4.7,
    nombre_avis: 34,
    categorie: { id: 5, nom: "Sports & Loisirs" }
  }
];

export const mockCategories = [
  { id: 1, nom: "Smartphones", nombre_produits: 12 },
  { id: 2, nom: "Ordinateurs", nombre_produits: 8 },
  { id: 3, nom: "Vêtements", nombre_produits: 45 },
  { id: 4, nom: "Maison & Jardin", nombre_produits: 23 },
  { id: 5, nom: "Sports & Loisirs", nombre_produits: 18 }
];

export const mockUser = {
  id: 1,
  nom: "Dupont",
  prenom: "Jean",
  email: "jean.dupont@email.com",
  role: "client"
};

export const mockReviews = [
  {
    id: 1,
    note: 5,
    titre: "Excellent produit !",
    commentaire: "Je suis très satisfait de cet achat. La qualité est au rendez-vous.",
    utilisateur: { nom: "Martin", prenom: "Pierre" },
    temps_ecoule: "il y a 2 jours",
    verifie: true,
    utile_count: 12
  },
  {
    id: 2,
    note: 4,
    titre: "Très bon rapport qualité-prix",
    commentaire: "Produit conforme à mes attentes. Quelques petits défauts mais rien de grave.",
    utilisateur: { nom: "Durand", prenom: "Marie" },
    temps_ecoule: "il y a 1 semaine",
    verifie: true,
    utile_count: 8
  }
];