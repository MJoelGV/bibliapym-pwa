import sys
import os
import re

def convert_to_xmm(input_file, output_file):
    """
    Convierte un archivo de texto con versículos bíblicos al formato .xmm
    Formato esperado de entrada:
    Libro Capítulo:Versículo Texto del versículo
    
    Ejemplo:
    Proverbios 25:1 También éstos son proverbios de Salomón...
    """
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        output_lines = []
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            # Buscar el patrón: Libro Capítulo:Versículo Texto
            match = re.match(r'(\w+)\s+(\d+):(\d+)\s+(.+)', line)
            if match:
                libro, capitulo, versiculo, texto = match.groups()
                # Convertir libro a minúsculas y sin acentos
                libro = libro.lower()
                libro = libro.replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')
                
                # Crear línea en formato .xmm
                xmm_line = f'{libro}.{capitulo}.{versiculo}|{texto}\n'
                output_lines.append(xmm_line)
            else:
                print(f'Advertencia: Línea ignorada (formato incorrecto): {line}')
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.writelines(output_lines)
            
        print(f'Archivo convertido exitosamente: {output_file}')
        
    except Exception as e:
        print(f'Error: {str(e)}')
        sys.exit(1)

def main():
    if len(sys.argv) != 3:
        print('Uso: python convert_to_xmm.py archivo_entrada.txt archivo_salida.xmm')
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    if not os.path.exists(input_file):
        print(f'Error: El archivo de entrada no existe: {input_file}')
        sys.exit(1)
    
    convert_to_xmm(input_file, output_file)

if __name__ == '__main__':
    main()
