 ##Componente Reutilizable##
 //**Podemos reutilizarlo en otro componente, por ejemplo integrandolo con la librería Zod para validaciones donde le pasamos la prop "hasError" para que la animación refleje el estado del envío. **//
          <div className="flex items-center justify-center">
            <ProgressButton type="submit" hasError={Object.keys(errors).length > 0} />
          </div>
//**nota: el className es totalmente opcional **//
