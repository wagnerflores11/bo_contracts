function replaceText(text: string) {
    const replaceCaracters = text
      .trim()
      .toLowerCase()
      .replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
      .replace(new RegExp('[ÉÈÊ]', 'gi'), 'e')
      .replace(new RegExp('[ÍÌÎ]', 'gi'), 'i')
      .replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
      .replace(new RegExp('[ÚÙÛ]', 'gi'), 'u')
      .replace(new RegExp('[Ç]', 'gi'), 'c');
  
    return replaceCaracters;
  }
  
  export default replaceText;