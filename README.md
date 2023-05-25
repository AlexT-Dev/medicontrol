# medicontrol
Para control de historia clínica

<script type="text/javascript" language="javascript" src="/css/sweetalert2.all.min.js"></script>
    <script>
         function confirmar(cuenta) {
            
            Swal.fire({
                title: 'CAMBIAR A INACTIVO',
                text: '¿Desea poner inactivo?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Confirmar'
            }).then((result) => {
                if (result.isConfirmed) {   
                window.location = 'delete/'+cuenta;                              
                }
            });
        };
  
    </script>