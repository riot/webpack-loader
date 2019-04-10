<component>
  <p onclick={action}>{ message }</p>

  <style>
    @import 'component';
  </style>

  <script>
    this.message = 'hi'

    action() {
      throw new Error('foo')
    }
  </script>
</component>