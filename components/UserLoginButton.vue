<template>
  <div>
    <div id="google">
      <a class="__sign-in" @click.stop.prevent="login" >
        <div style="height:50px;" class="abcRioButton abcRioButtonBlue">
          <div class="abcRioButtonContentWrapper">
            <div class="abcRioButtonIcon" style="padding:15px">
              <div style="width:18px;height:18px;"
                   class="abcRioButtonSvgImageWithFallback abcRioButtonIconImage abcRioButtonIconImage18">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px"
                     height="18px" viewBox="0 0 48 48" class="abcRioButtonSvg">
                  <g>
                    <path fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    <path fill="none" d="M0 0h48v48H0z"/>
                  </g>
                </svg>
              </div>
            </div>
            <span style="font-size:16px;line-height:48px;" class="abcRioButtonContents">
              <span id="not_signed_inh2wcm9q59y1b">Sign in with Google</span>
              <span id="connectedh2wcm9q59y1b"
                    style="display:none">Signed in with Google</span>
            </span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  methods: {
    async login() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider()
        const { user } = await firebase.auth().signInWithPopup(provider)
        console.log(user)
        const selectProps = ({ uid, displayName, email, photoURL }) => ({
          uid,
          username: displayName,
          email,
          photoURL
        })
        await this.setCookie()

        this.$store.commit("UPDATE_USER_STATE", selectProps(user))
        this.redirect()
      } catch (error) {
        console.log(error)
      }
    },
    async setCookie() {
      const token = await firebase.auth().currentUser.getIdToken()
      document.cookie = `__session=${token};max-age=${token ? 3600 : 0}`
    },
    redirect() {
      this.$router.push("/top")
    }
  }
}
</script>

<style scoped>
/* https://codepen.io/mazedul/pen/VajqEG
A PEN BY Md Mazedul Islam Khan */
.abcRioButton {
  display: block;
  margin-left: auto;
  margin-right: auto;
  -webkit-border-radius: 1px;
  border-radius: 1px;
  /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25); */
  box-sizing: border-box;
  transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
  user-select: none;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  color: #262626;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: auto;
  width: 50px;
}
.abcRioButton:hover {
  /* box-shadow: 0 0 3px 3px rgba(66, 133, 244, 0.3); */
}

.abcRioButtonRed {
  border: none;
  color: #fff;
  background-color: #dc4e41;
}
.abcRioButtonRed:active {
  background-color: #c53829;
}
.abcRioButtonRed .abcRioButtonContentWrapper {
  border: 1px solid transparent;
}

.abcRioButtonBlue {
  border: none;
  color: #fff;
  /* background-color: #4285f4; */
}
.abcRioButtonBlue:hover {
  /* background-color: #4285f4; */
}
.abcRioButtonBlue:active {
  /* background-color: #3367d6; */
}
.abcRioButtonBlue .abcRioButtonIcon {
  background-color: #fff;
  border-radius: 1px;
}
.abcRioButtonBlue .abcRioButtonContentWrapper {
  border: 1px solid transparent;
}

.abcRioButtonLightBlue {
  background-color: #fff;
  color: #757575;
}
.abcRioButtonLightBlue:active {
  background-color: #eee;
  color: #6d6d6d;
}

.abcRioButtonWhite {
  background-color: #fff;
  color: #dc4e41;
}
.abcRioButtonWhite:active {
  background-color: #eee;
}
.abcRioButtonWhite path {
  fill: #dc4e41;
}

.abcRioButtonIcon {
  float: left;
}

.abcRioButtonSvg {
  display: block;
}

.abcRioButtonContents {
  font-family: Roboto, arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.21px;
  margin-left: 6px;
  margin-right: 6px;
  vertical-align: top;
}

.abcRioButtonContentWrapper {
  height: 100%;
  width: 100%;
}

.abcRioButtonGreen .abcRioButtonContentWrapper {
  border: 1px solid transparent;
}

.abcRioButtonDarkGray .abcRioButtonContentWrapper {
  border: 1px solid transparent;
}

.abcRioButtonGrayedOut .abcRioButtonContentWrapper {
  border: 1px solid transparent;
}

.abcRioButtonErrorWrapper {
  display: none;
  height: 100%;
  width: 100%;
}

.abcRioButtonWorkingWrapper {
  display: none;
  height: 100%;
  width: 100%;
}

.abcRioButtonErrorIcon {
  margin-left: auto;
  margin-right: auto;
}

.abcRioButtonWorkingIcon {
  margin-left: auto;
  margin-right: auto;
}

.abcRioButtonErrorState {
  border: 1px solid #d5d5d5;
  border: 1px solid rgba(0, 0, 0, 0.17);
  /* box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05); */
  color: #262626;
  background-color: #fff;
}
.abcRioButtonErrorState:hover {
  border: 1px solid #aaa;
  border: 1px solid rgba(0, 0, 0, 0.25);
  /* box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1); */
  background-color: #fff;
}
.abcRioButtonErrorState:active {
  border: 1px solid #aaa;
  border: 1px solid rgba(0, 0, 0, 0.25);
  /* box-shadow: inset 0 1px 0 #ddd; */
  color: #262626;
  background-color: #e5e5e5;
}
.abcRioButtonErrorState .abcRioButtonErrorWrapper {
  display: block;
}
.abcRioButtonErrorState .abcRioButtonContentWrapper {
  display: none;
}
.abcRioButtonErrorState .abcRioButtonWorkingWrapper {
  display: none;
}

.abcRioButtonWorkingState {
  border: 1px solid #d5d5d5;
  border: 1px solid rgba(0, 0, 0, 0.17);
  /* box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05); */
  color: #262626;
  background-color: #f5f5f5;
}
.abcRioButtonWorkingState:hover {
  border: 1px solid #aaa;
  border: 1px solid rgba(0, 0, 0, 0.25);
  /* box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1); */
  background-color: #f5f5f5;
}
.abcRioButtonWorkingState:active {
  border: 1px solid #aaa;
  border: 1px solid rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: inset 0 1px 0 #ddd;
  box-shadow: inset 0 1px 0 #ddd;
  color: #262626;
  background-color: #e5e5e5;
}
.abcRioButtonWorkingState .abcRioButtonWorkingWrapper {
  display: block;
}
.abcRioButtonWorkingState .abcRioButtonContentWrapper {
  display: none;
}

#google .__sign-in {
  text-decoration: none;
}
#google .__sign-in:hover {
  text-decoration: none;
}
#google .__sign-in:focus {
  text-decoration: none;
}
</style>
