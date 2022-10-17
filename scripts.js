for (var index = 0; index < 59; index++) {
  const slice = document.getElementById('slice');
  const img = document.createElement('img');

  img.setAttribute('src', './slices/' + index + '.jpg');
  img.setAttribute('alt', 'slice ' + index);

  slice.append(img);
}
