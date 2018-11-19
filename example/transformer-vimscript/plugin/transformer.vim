function! VSTSnakeCase()
  let word = expand('<cWORD>')
  let clipboard = @+
  if word =~# '\v\w+(-\w+)+' || word =~# '\v\C<([a-zA-Z][a-z0-9]+)(\u)'
    execute("normal! ma")
    if word =~# '\v\w+(-\w+)+'
      let result = tolower(substitute(word, "-", "_", "g"))
      let @+ = result
    elseif word =~# '\v\C<([a-zA-Z][a-z0-9]+)(\u)'
      let result = tolower(substitute(word, '\v\C([a-zA-Z][a-z0-9]+)(\u)', '\1_\2', 'g'))
      let @+ = result
    endif
    execute("normal! viWp")
    execute("normal! `a")
    let @+ = clipboard
  endif
endfunction
