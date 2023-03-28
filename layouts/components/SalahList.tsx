const SalahList = ({ salat }: any) => {
  return (
    <div className="container" id="prayers">
      <div className="items-center gap-8 md:grid md:grid-cols-2">
        {/* Carousel */}
        <div className={`service-content mt-5 md:mt-0`}>
          <h2 className="font-bold leading-[40px]">
            Welcome to the Jamaah Mosque
          </h2>
          <p className="mt-4 mb-2">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in Bookmarksgrove right at the coast of the Semantics, a large
            language ocean. A small river named Duden flows by
          </p>
        </div>

        {/* Content */}
        <div className={`service-content mt-5 bg-theme-light p-4 md:mt-0`}>
          <h2 className="text-center font-bold leading-[40px]">Prayer Times</h2>
          <h5 className="text-center font-bold leading-[40px]">
            {new Date().toDateString()}
          </h5>
          <hr />
          {salat.salats.map((e: any) => {
            return (
              <>
                <div className="mt-4 mb-2 grid grid-cols-5 gap-3">
                  <div>
                    <h5>{e.name}</h5>
                  </div>
                  <div className="col-span-4 pr-2 text-end">
                    <h5>{e.content}</h5>
                  </div>
                </div>
                <hr className="borde border-dashed" />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SalahList;
