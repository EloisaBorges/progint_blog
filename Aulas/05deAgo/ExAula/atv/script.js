const cepInput = document.getElementById('cep');

cepInput.addEventListener('blur', () => {
  const cep = cepInput.value.replace(/\D/g, ''); 
  const erro = document.getElementById('erro');
  erro.textContent = '';

  if (cep.length !== 8) {
    erro.textContent = 'CEP inválido!';
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) {
        erro.textContent = 'CEP não encontrado!';
        return;
      }
      document.getElementById('logradouro').value = data.logradouro;
      document.getElementById('bairro').value = data.bairro;
      document.getElementById('cidade').value = data.localidade;
      document.getElementById('uf').value = data.uf;
    })
    .catch(() => erro.textContent = 'Erro ao buscar CEP.');
});