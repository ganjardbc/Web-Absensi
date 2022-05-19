<template>
  <div id="app" class="app-main app-side-mins">
    <div 
			id="nav" 
			class="app-slide app-side-min">
			<div class="slide-content gradient-blue">
				<div class="app-title">
	        <div class="col-1">
	          <h1 class="txt-site txt-white txt-upp txt-18 txt-bold post-center margin-left-10px">
	            ABSENSI
	          </h1>
	        </div>
	        <div class="col-2"></div>
	      </div>
				<div class="slide-list change-scrollbar">

					<div class="app-space-content">
						<div class="app-menu">
							<router-link to="/beranda">
								<li class="a-m-content">
									<div class="a-m-list">
										<div class="a-m-icn">
											<i class='fa fa-lg fa-home'></i>
										</div>
										<div class="a-m-ttl">
											Beranda
										</div>
										<div class="a-m-icn a-m-icn-right txt-site txt-right txt-12"></div>
									</div>
								</li>
							</router-link>
						</div>
					</div>

					<div class="app-space">
            <input type="checkbox" name="mainmenu" checked="true" id="mainmenu-master-data" />
						<label for="mainmenu-master-data" class="a-m-list">
							<span class="app-space-icon">
								<i class="fa fa-1x fa-database" />
							</span>
							<span class="app-space-text">
								Master Data
							</span>
							<span class="app-space-sign"></span>
						</label>
						<div class="app-space-content">
							<div class="app-menu">
								<router-link to="/pegawai">
									<li class="a-m-content">
										<div class="a-m-list">
											<div class="a-m-icn">
												<i class='fa fa-lg fa-users'></i>
											</div>
											<div class="a-m-ttl">
												Pegawai
											</div>
											<div class="a-m-icn a-m-icn-right txt-site txt-right txt-12"></div>
										</div>
									</li>
								</router-link>
								<router-link to="/jabatan">
									<li class="a-m-content">
										<div class="a-m-list">
											<div class="a-m-icn">
												<i class='fa fa-lg fa-user-plus'></i>
											</div>
											<div class="a-m-ttl">
												Jabatan
											</div>
											<div class="a-m-icn a-m-icn-right txt-site txt-right txt-12"></div>
										</div>
									</li>
								</router-link>
								<router-link to="/matapelajaran">
									<li class="a-m-content">
										<div class="a-m-list">
											<div class="a-m-icn">
												<i class='fa fa-lg fa-building'></i>
											</div>
											<div class="a-m-ttl">
												Mata Pelajaran
											</div>
											<div class="a-m-icn a-m-icn-right txt-site txt-right txt-12"></div>
										</div>
									</li>
								</router-link>
                <router-link to="/jadwal">
									<li class="a-m-content">
										<div class="a-m-list">
											<div class="a-m-icn">
												<i class='fa fa-lg fa-clock'></i>
											</div>
											<div class="a-m-ttl">
												Jadwal
											</div>
											<div class="a-m-icn a-m-icn-right txt-site txt-right txt-12"></div>
										</div>
									</li>
								</router-link>
                <router-link to="/kehadiran">
									<li class="a-m-content">
										<div class="a-m-list">
											<div class="a-m-icn">
												<i class='fa fa-lg fa-check'></i>
											</div>
											<div class="a-m-ttl">
												Kehadiran
											</div>
											<div class="a-m-icn a-m-icn-right txt-site txt-right txt-12"></div>
										</div>
									</li>
								</router-link>
                <router-link to="/laporan">
									<li class="a-m-content">
										<div class="a-m-list">
											<div class="a-m-icn">
												<i class='fa fa-lg fa-file'></i>
											</div>
											<div class="a-m-ttl">
												Laporan
											</div>
											<div class="a-m-icn a-m-icn-right txt-site txt-right txt-12"></div>
										</div>
									</li>
								</router-link>
							</div>
						</div>
          </div>

					<div class="app-space">
            <input type="checkbox" name="mainmenu" checked="true" id="mainmenu-data-siswa" />
						<label for="mainmenu-data-siswa" class="a-m-list">
							<span class="app-space-icon">
								<i class="fa fa-1x fa-database" />
							</span>
							<span class="app-space-text">
								Akun
							</span>
							<span class="app-space-sign"></span>
						</label>
						<div class="app-space-content">
							<div class="app-menu">
								<router-link to="/">
									<li class="a-m-content">
										<div class="a-m-list">
											<div class="a-m-icn">
												<i class='fa fa-lg fa-cogs'></i>
											</div>
											<div class="a-m-ttl">
												Pengaturan
											</div>
											<div class="a-m-icn a-m-icn-right txt-site txt-right txt-12"></div>
										</div>
									</li>
								</router-link>
							</div>
						</div>
          </div>

				</div>
			</div>
		</div>
		<div id="main" class="app-main-place">
      <div class="app-main-panel">
        <div class="app-panel-content grid grid-2x">
          <div></div>
          <div class="content-right">
            <router-link to="/">
              <button class="btn btn-radius btn-grey">
                <i class='fa fa-lg fa-power-off'></i>
                LOGOUT
              </button>
            </router-link>
          </div>
        </div>
      </div>
			
      <div class="app-main-content">
        <div class="padding-30px"></div>
				<div class="padding-left-5px padding-right-5px">
          <router-view></router-view>
        </div>
        <div class="padding-10px"></div>
			</div>

		</div>

    <router-view name="absensi"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import url('./assets/icons/fontawesome/css/all.min.css');
  @import url('./assets/scss/app.css');
</style>
