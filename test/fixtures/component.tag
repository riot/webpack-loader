<component>
  <p onclick={action}>{ message }</p>

  <script>
    this.message = 'hi'


    action() {
      throw new Error('foo')
    }
  </script>
</component>