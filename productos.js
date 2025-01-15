const fundas = [
    {
      id:1,
      nombre: "Puffer The North Face",
      img: "1.jpg",
      precio: 5000,
    },
    {
      id:2,
      nombre: "Soft",
      img: "2.jpg",
      precio: 2000,
    },
    {
      id:3,
      nombre: "Cámara Glitter",
      img: "3.jpg",
      precio: 4500,
    },
    {
      id:4,
      nombre: "Mag Safe",
      img: "4.jpg",
      precio: 5000,
    },
    {
      id:5,
      nombre: "Silicon sin logo",
      img: "5.jpg",
      precio: 4000,
    },
    {
      id:6,
      nombre: "Borde Glitter",
      img: "6.jpg",
      precio: 3000,
    }
  ]

  localStorage.setItem('fundas', JSON.stringify(fundas));