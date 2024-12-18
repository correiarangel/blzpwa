using System.ComponentModel.DataAnnotations;


public class Pessoa
{
    [Required(ErrorMessage = "O Nome é obrigatório")]
    [StringLength(100, ErrorMessage = "O Nome deve ter no máximo 100 caracteres.")]
    public  string? Nome { get; set; }


    [Required(ErrorMessage = "O Email é obrigatório")]
    [EmailAddress(ErrorMessage = "Informe um Email válido")]
    public  string? Email { get; set; }

    [Required(ErrorMessage = "A idade é obrigatória ")]
    [Range(1, 150, ErrorMessage = "A Idade deve estar entre 1 e 120 anos.")]
    public int Idade { get; set; }


    [StringLength(15, ErrorMessage = "O Telefone deve ter no máximo 15 caracteres.")]
    public  string? Telefone { get; set; }
}