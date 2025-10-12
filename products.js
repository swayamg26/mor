const allProducts = [
    { 
        id: "1A", name: "Black Chikankari Kurti", price: "₹1,499", oldPrice: "₹1,999", imgSrc: "1A.jpg", material: "Cotton", pageUrl: "product.html?id=1A",
        galleryImages: ["1A.jpg", "1B.jpg", "1C.jpg"],
        sizes: ["S", "M", "L", "XL"],
        description: "Embrace timeless elegance with this stunning Black Chikankari Kurti. Hand-embroidered with intricate floral patterns, this piece is a testament to traditional craftsmanship. Made from pure, breathable cotton, it ensures comfort throughout the day.",
        specification: "<strong>Material:</strong> 100% Premium Cotton <br> <strong>Embroidery:</strong> Hand-stitched Chikankari <br> <strong>Fit:</strong> Regular <br> <strong>Sleeves:</strong> 3/4 Length"
    },
    { 
        id: "2A", name: "Stylish Rayon Kurti", price: "₹1,399", oldPrice: "₹1,799", imgSrc: "2A.jpg", material: "Rayon", pageUrl: "product.html?id=2A",
        galleryImages: ["2A.jpg", "2B.jpg"], pageUrl: "product.html?id=2A",
        sizes: ["S", "M", "L"],
        description: "Discover modern sophistication with this Stylish Rayon Kurti. Featuring a unique asymmetrical design and delicate floral embroidery, this piece is perfect for contemporary fashion lovers. The soft rayon fabric drapes beautifully for a flattering fit.",
        specification: "<strong>Material:</strong> Premium Rayon <br> <strong>Embroidery:</strong> Machine-embroidered floral motifs <br> <strong>Fit:</strong> Asymmetrical <br> <strong>Sleeves:</strong> Kaftan Style"
    },
    { 
        id: "3A", name: "Elegant Georgette Kurti", price: "₹1,599", oldPrice: "₹2,199", imgSrc: "3A.jpg", material: "Georgette", pageUrl: "product.html?id=3A",
        galleryImages: ["3A.jpg", "3B.jpg", "3C.jpg", "3D.jpg", "3E.jpg"],
        sizes: ["S", "M", "L"],
        description: "Step out in style with this Elegant Georgette Kurti. The beautiful floral print on the sleeves and body adds a touch of nature-inspired charm. Crafted from lightweight georgette, it's perfect for both casual outings and special events.",
        specification: "<strong>Material:</strong> Premium Georgette <br> <strong>Print:</strong> Digital Floral Print <br> <strong>Fit:</strong> A-Line <br> <strong>Sleeves:</strong> Bell Sleeves"
    },
    { 
        id: "4A", name: "Classic Viscose Kurta", price: "₹1,899", oldPrice: "₹2,499", imgSrc: "4A.jpg", material: "Viscose", pageUrl: "product.html?id=4A",
        galleryImages: ["4A.jpg", "4B.jpg", "4C.jpg"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Experience luxurious comfort with our Classic Viscose Kurta set. The rich mustard yellow hue and flowing kaftan-style top create a look of effortless grace. Perfect for festive occasions or a stylish day out.",
        specification: "<strong>Material:</strong> Premium Viscose Rayon <br> <strong>Style:</strong> Kaftan Kurta with Palazzo Pants <br> <strong>Fit:</strong> Relaxed <br> <strong>Neck:</strong> Round Neck"
    },
    { 
        id: "5A", name: "Green Floral Kurti", price: "₹1,199", oldPrice: "₹1,599", imgSrc: "5A.jpg", material: "Cotton", pageUrl: "product.html?id=5A",
        galleryImages: ["5A.jpg", "5B.jpg"],
        sizes: ["S", "M", "L"],
        description: "A chic and modern one-shoulder ensemble in a refreshing light green. This outfit features a stylish draped top paired with comfortable wide-leg pants, perfect for making a fashion-forward statement at any event.",
        specification: "<strong>Material:</strong> Crepe <br> <strong>Style:</strong> One-Shoulder Draped Top with Palazzo <br> <strong>Fit:</strong> Relaxed <br> <strong>Occasion:</strong> Party, Festive"
    },
    { 
        id: "6A", name: "Red Printed Kurti", price: "₹1,299", oldPrice: "₹1,699", imgSrc: "6A.jpg", material: "Rayon", pageUrl: "product.html?id=6A",
        galleryImages: ["6A.jpg", "6B.jpg", "6C.jpg"],
        sizes: ["S", "M", "XL"],
        description: "Charming and graceful, this off-white kurti is adorned with delicate floral embroidery and lace details. Paired with matching straight-fit pants, this set is a perfect blend of simplicity and elegance for any daytime event.",
        specification: "<strong>Material:</strong> Cotton Blend <br> <strong>Embroidery:</strong> Machine Floral Embroidery <br> <strong>Fit:</strong> Straight Fit <br> <strong>Sleeves:</strong> Full Length"
    },
    { 
        id: "7A", name: "Yellow Summer Kurti", price: "₹1,099", oldPrice: "₹1,499", imgSrc: "7A.jpg", material: "Cotton", pageUrl: "product.html?id=7A",
        galleryImages: ["7A.jpg", "7B.jpg"],
        sizes: ["S", "M"],
        description: "Make a bold statement with this zebra-print co-ord set. Featuring a tie-front shrug and matching wide-leg pants, this outfit is both fierce and fashionable. The lightweight fabric makes it perfect for a stylish summer look.",
        specification: "<strong>Material:</strong> Poly-Crepe <br> <strong>Style:</strong> Shrug with Wide-Leg Pants <br> <strong>Print:</strong> Zebra Animal Print <br> <strong>Fit:</strong> Relaxed"
    },
    { 
        id: "8A", name: "Blue Casual Kurti", price: "₹1,399", oldPrice: "₹1,899", imgSrc: "8A.jpg", material: "Viscose", pageUrl: "product.html?id=8A",
        galleryImages: ["8A.jpg", "8B.jpg", "8C.jpg", "8D.jpg"],
        sizes: ["S", "M", "L", "XL"],
        description: "A beautiful Ikat-printed kurti in shades of pink and purple. This piece features delicate embroidery on the neckline and is paired with matching printed pants, offering a vibrant and traditional look with a modern twist.",
        specification: "<strong>Material:</strong> Viscose Rayon <br> <strong>Print:</strong> Ikat Print <br> <strong>Fit:</strong> Straight <br> <strong>Sleeves:</strong> 3/4 Length"
    },
    { 
        id: "9A", name: "Navy Blue Kurti Set", price: "₹1,799", oldPrice: "₹2,399", imgSrc: "9A.jpg", material: "Silk Blend", pageUrl: "product.html?id=9A",
        galleryImages: ["9A.jpg", "9B.jpg", "9C.jpg"],
        sizes: ["M", "L", "XL"],
        description: "A sophisticated navy blue kurti set crafted from a luxurious silk blend. This elegant ensemble is perfect for formal events and celebrations, offering a rich look and comfortable feel.",
        specification: "<strong>Material:</strong> Silk Blend <br> <strong>Fit:</strong> Regular <br> <strong>Sleeves:</strong> Full Length"
    },
    { 
        id: "10A", name: "Maroon Velvet Kurti", price: "₹2,499", oldPrice: "₹3,199", imgSrc: "10A.jpg", material: "Velvet", pageUrl: "product.html?id=10A",
        galleryImages: ["10A.jpg", "10B.jpg", "10C.jpg", "10D.jpg"],
        sizes: ["S", "M", "L"],
        description: "Radiate vibrancy in this stunning pink printed kurti set. The asymmetrical hemline, bell sleeves, and intricate neckline embroidery make this a standout piece. Perfect for celebrations and festive occasions where you want to shine.",
        specification: "<strong>Material:</strong> Modal Satin <br> <strong>Style:</strong> Asymmetrical Kurta with Pants <br> <strong>Fit:</strong> Relaxed <br> <strong>Sleeves:</strong> Bell Sleeves"
    },
    { 
        id: "11A", name: "Light Green Kurti", price: "₹1,450", oldPrice: "₹1,950", imgSrc: "11A.jpg", material: "Cotton", pageUrl: "product.html?id=11A",
        galleryImages: ["11A.jpg", "11B.jpg"],
        sizes: ["S", "M", "L"],
        description: "A breezy and beautiful kaftan-style kurti in a subtle off-white, featuring bold black embroidery and tassel details. This free-flowing silhouette offers unmatched comfort and a touch of bohemian chic to your wardrobe.",
        specification: "<strong>Material:</strong> Cotton <br> <strong>Style:</strong> Kaftan Kurta with Pants <br> <strong>Embroidery:</strong> Machine-embroidered patterns <br> <strong>Details:</strong> Tassels on sleeves and hem"
    },
    { 
        id: "12A", name: "Purple Silk Kurti", price: "₹1,999", oldPrice: "₹2,599", imgSrc: "12A.jpg", material: "Silk", pageUrl: "product.html?id=12A",
        galleryImages: ["12A.jpg", "12B.jpg"],
        sizes: ["M", "L", "XL"],
        description: "A vibrant and playful printed kaftan set in shades of pink and orange. This comfortable and stylish co-ord set features a relaxed-fit kaftan top with a drawstring waist and matching pants, perfect for a vacation or a casual day out.",
        specification: "<strong>Material:</strong> Silk Blend <br> <strong>Style:</strong> Kaftan with Pants <br> <strong>Print:</strong> Abstract Floral Print <br> <strong>Fit:</strong> Relaxed"
    },
    { 
        id: "13A", name: "Royal Blue Silk Saree", price: "₹2,999", oldPrice: "₹3,999", imgSrc: "13A.jpg", material: "Silk", pageUrl: "product.html?id=13A",
        galleryImages: ["13A.jpg", "13B.jpg"],
        sizes: ["Free Size"],
        description: "A unique and artistic hand-painted floral design on a comfortable shirt-style kurti and pant set. The beautiful blue flower stands out against the off-white fabric, creating a wearable piece of art that's perfect for a creative and stylish look.",
        specification: "<strong>Material:</strong> Cotton Linen <br> <strong>Style:</strong> Shirt-style Kurti with Pants <br> <strong>Art:</strong> Hand-painted Floral Design <br> <strong>Fit:</strong> Regular"
    }
];

// Make it accessible to other scripts
window.allProducts = allProducts;