function getData (callback) {
  let dataExists,
    interactiveData;

  // Look if there is a global variable declared with specific data for this infographic
  try {
    if (los_presidenciables_2018_data) {
      dataExists = true;
      interactiveData = los_presidenciables_2018_data;
    }
  } catch (e) {
    dataExists = false;
  }

  // If the variable exists, and has a dataUri key, download the data
  if (dataExists) {
    if (interactiveData.dataUri) {
      fetchData(interactiveData.dataUri, (data) => {
        const formattedData = formatData(data);
        if (callback) callback(formattedData);
      });
    }
  } else {
    callback([]);
  }
}

function photoUrl (url) {
  const pattern = /^((http|https|ftp):\/\/)/;
  let fotoUrl = url;
  if (!pattern.test(url)) {
    fotoUrl = `https://lsv-archivo.imgix.net/candidatoscongreso2018/${url || '60.jpg'}`
  }
  return fotoUrl;
}

function formatData (data) {
  return data.map((item, key) => {
    return {
      id: 'p' + key,
      apellido1: item.apellido1,
      apellido2: item.apellido2,
      nombres: item.nombres,
      name: `${item.nombres} ${item.apellido1}`,
      perfilDeQuienEsQuien: item.quienEsQuien,
      twitter: item.twitter,
      facebook: item.facebook,
      paginaWeb: item.paginaWeb,
      foto: photoUrl(item.fotoURL),
      camara: 'ASPIRANTE A PRESIDENCIA',
      partido: item.partidos ? item.partidos.trim() : item.partidos,
      caracter: [item.caracter1, item.caracter2, item.caracter3],
      caracterogramaURL: item.caracterogramaURL,
      mentirasMasRepetidas: [item.mentiraMasRepetida1, item.mentiraMasRepetida2, item.mentiraMasRepetida3],
      detectorURL: item.detectorURL,
      hablanAlOido: [
        { name: item.leHablaAlOido1, photo: photoUrl(item.fotoOido1) },
        { name: item.leHablaAlOido2, photo: photoUrl(item.fotoOido2) },
        { name: item.leHablaAlOido3, photo: photoUrl(item.fotoOido3) },
        { name: item.leHablaAlOido4, photo: photoUrl(item.fotoOido4) },
        { name: item.leHablaAlOido5, photo: photoUrl(item.fotoOido5) },
        { name: item.leHablaAlOido6, photo: photoUrl(item.fotoOido6) },
        { name: item.leHablaAlOido7, photo: photoUrl(item.fotoOido7) },
      ],
      relacionesURL: item.relacionesURL,
      positions: [
        {
          title: "El acuerdo con las Farc",
          result: item.posicionAcuerdo.split(', ')[1],
          positive: Number(item.posicionAcuerdo.split(', ')[0])
        },
        {
          title: "Los impuestos para empresas",
          result: item.posicionImpuestos.split(', ')[1],
          positive: Number(item.posicionImpuestos.split(', ')[0])
        },
        {
          title: "La adopción gay",
          result: item.posicionAdopcion.split(', ')[1],
          positive: Number(item.posicionAdopcion.split(', ')[0])
        }
      ],
      testProgramaticoURL: item.testProgramaticoURL,
      proyectosBandera: item.proyectosBandera,
      comparacionDeProgramasURL: item.comparacionDeProgramasURL,
      apoyos: [item.apoyo1, item.apoyo2, item.apoyo3],
      todosLosActivosURL: item.todosLosActivosURL,
      historiasSobreElCandidatoURL: item.historiasSobreElCandidatoURL
      // votosMasRecientes: item.K,
      // enQueEleccionSacoLosVotosMasRecientes: item.L,
      // genero: item.O ? item.O.trim() : item.O,
      // partido: item.Q ? item.Q.trim() : item.Q,
      // numeroEnElTarjeton: item.R,
      // posicionIz_der1A100: item.S,
      // departamento: item.D ? item.D.trim() : item.D,
      // profesionUOficio: item.U,
      // nivelDeEstudios: item.V,
      // sectorDelQueViene: item.W ? item.W.trim() : item.W,
      // expertoEn: item.X ? item.X.trim() : item.X,
      // tieneInvestigacionesPenales: item.Y,
      // haSidoCondenado: item.Z,
      // haSidoDestituido: item.AA,
      // haSidoCongresista: item.AB,
      // periodosComoCongresista: item.AC,
      // haSidoGobernador: item.AD,
      // haSidoDiputado: item.AE,
      // haSidoAlcalde: item.AF,
      // haSidoConcejal: item.AG,
      // haSidoAntesCandidatoACargosDeEleccionPopular: item.AH,
      // haEstadoEnMasDeDosPartidos: item.AI,
      // haOcupadoUnCargoPublico: item.AJ,
      // herederoDeVotosDeCondenados: item.AK,
      // herederoDeVotosDeInvestigados: item.AL,
      // cuestionado: item.AM,
      // tieneFamiliarEnLaPolitica: item.AN,
      // esHerederoPolitico: item.AO,
      // perfilito: item.AP,
      // foto: fotoUrl,
      // buscaReeleccion: item.AR,
      // saltoCamaraSenado: item.AS,
      // precandidatoQueApoyaba: item.AT,
      // candidatoPresidencialQueApoya: item.AU,
      // bandera1: item.AV,
      // bandera2: item.AW,
      // bandera3: item.AX,
      // esAfro: item.AY
    }
  });
}

function fetchData (uri, callback) {
  fetch(uri)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      if (callback) callback(json);
    })
    .catch((ex) => {
      console.log('parsing failed', ex)
    })
}

export default getData;